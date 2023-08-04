import { defineStore } from "pinia";
import { ref, onMounted } from "vue";

import { db } from '@/firebase'
import { doc, collection, updateDoc, onSnapshot, setDoc, query, where, orderBy } from "firebase/firestore"


const accountCollectionFB = collection(db, "accounts")
const transactionCollectionFB = collection(db, "transactions")
const accountType = ref(['bank', 'ewallet', 'cash'])
const accounts = ref([])
const transactionsLastID =  ref(0)
const transactions = ref([])

function getAccountNameByID(id, isAccount=true){
    if(isAccount){
        return accounts.value.find((item) => item.id == id).name
    } else {
        return id
    }
}



export const useAccountsStore = defineStore('accounts', () => {

    onMounted(() => {
        onSnapshot(accountCollectionFB, (querySnapshot) => {
            let res = []
            querySnapshot.forEach((doc) => {
                res.push({
                    id:doc.id,
                    name:doc.data().name,
                    desc:doc.data().desc,
                    accountType:doc.data().accountType,
                    balance:doc.data().balance
                })
            })
            accounts.value = res
        })
        onSnapshot(doc(transactionCollectionFB, '0'), (doc) => {
            transactionsLastID.value = doc.data().lastID
        })
    })
    

    function mutation(from, to, isAccount, amount){
        try{
            updateDoc(doc(accountCollectionFB, from), {
                balance:(accounts.value.find((item) => item.id == from).balance) - amount,
            })
    
            if (isAccount) {
                updateDoc(doc(accountCollectionFB, to), {
                    balance:(accounts.value.find((item) => item.id == to).balance) + amount,
                })
            }
        } catch (error) {
            return error
        }
        
    }

    function debit(to, amount){
        try {
            updateDoc(doc(accountCollectionFB, to), {
                balance:(accounts.value.find((item) => item.id == to).balance) + amount,
            })
        } catch (error) {
            return error
        }
    }

    function credit(from, amount){
        try {
            updateDoc(doc(accountCollectionFB, from), {
                balance:(accounts.value.find((item) => item.id == from).balance) - amount,
            })
        } catch (error) {
            return error
        }
    }

    return {accounts, accountType, mutation, debit, credit}
})

export const useTransactionStore = defineStore('transaction', () => {
    const creditCategories = ref(['raw material', 'complement', 'shipment', 'salary', 'other business needs', 'receivable', 'individual needs', 'others'])
    const debitCategories = ref(['selling product', 'selling assets', 'gift', 'debt', 'others'])

    
    function loadFromDB(ts){
        const q = query(transactionCollectionFB,  where('datetime', '>=', ts), orderBy("datetime", "desc"))
        onSnapshot(q, (querySnapshot) => {
            let res = []
            querySnapshot.forEach((doc) => {
                let desc = '' 
                if (doc.data().type == 'mutation') {
                    let isAccount = true
                    if(!doc.data().isAccount){
                        isAccount = false
                    }
                    desc = 'dari '+getAccountNameByID(doc.data().from)+' ke '+getAccountNameByID(doc.data().to, isAccount)+' untuk '+doc.data().desc
                } else if (doc.data().type == 'credit') {
                    desc = 'dana dari '+getAccountNameByID(doc.data().from)+' untuk '+doc.data().desc+' ('+creditCategories.value[doc.data().cat]+')'
                } else {
                    desc = 'dana masuk ke '+getAccountNameByID(doc.data().to)+' dari '+debitCategories.value[doc.data().cat]+' '+doc.data().desc
                }
                res.push({
                    id:doc.id,
                    type:doc.data().type,
                    datetime:doc.data().datetime,
                    amount:doc.data().amount,
                    desc:desc,
                })
            })
            transactions.value = res
        })
    }

    onMounted(() => {
        const cdt = new Date()
        const ts = new Date(cdt.getFullYear(),cdt.getMonth(), cdt.getDate()).getTime()
        loadFromDB(ts)
    })

    
    function newTransaction(data){
        let newTransactionID = transactionsLastID.value + 1
        try {
            setDoc(doc(transactionCollectionFB, String(newTransactionID)), data)
            setDoc(doc(transactionCollectionFB, '0'), {
                lastID:transactionsLastID.value + 1
            })
        } catch (error) {
            console.log(error)
            return error
        }
        
    }
    return {debitCategories, creditCategories, transactions, loadFromDB, newTransaction}
})

export const useNotificationStore = defineStore('store', () => {
    const show = ref(false)
    const data = ref([])
    const notifType = ref([
        {
            name:'success',
            icon:'bi-check-circle-fill',
            header_bg: '#c0f7dd',
            body_bg: '#c1ddd0'
            // ['#c0f7dd','#c1ddd0'] 
        },
        {
            name:'info',
            icon:'bi-info-circle-fill',
            header_bg: '#94ebf1',
            body_bg: '#b9e6e9'
            // #94ebf1, #b9e6e9
        },
        {
            name:'error',
            icon:'bi-x-circle-fill',
            header_bg: '#f38080',
            body_bg: '#f1b7b7'
            // #f38080, #f1b7b7
        },
    ])

    function setNotif(typ, message){
        show.value = true,
        data.value = notifType.value.find((item) => item.name == typ)
        data.value.message = message
    }

    return {show, data, setNotif}
})
