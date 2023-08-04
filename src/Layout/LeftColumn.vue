<script setup>
import { onMounted, ref } from "vue";
import isDesktop from "@/assets/static/js/helper/isDesktop";

import PerfectScrollbar from "perfect-scrollbar";

const sidebarMini = ref(false)
onMounted(() => {
  /**
   * Calculate nested children height in sidebar menu
   *
   * @param {HTMLElement} el
   */
  const calculateChildrenHeight = (el, deep = false) => {
    const children = el.children;

    let height = 0;
    for (let i = 0; i < el.childElementCount; i++) {
      const child = children[i];
      height += child.querySelector(".submenu-link").clientHeight;

      // 2-level menu
      if (deep && child.classList.contains("has-sub")) {
        const subsubmenu = child.querySelector(".submenu");

        if (subsubmenu.classList.contains("submenu-open")) {
          const childrenHeight = ~~[
            ...subsubmenu.querySelectorAll(".submenu-link"),
          ].reduce((acc, curr) => acc + curr.clientHeight, 0);
          height += childrenHeight;
        }
      }
    }
    el.style.setProperty("--submenu-height", height + "px");
    return height;
  };

  /**
   * a Sidebar component
   * @param  {HTMLElement} el - sidebar element
   * @param  {object} options={} - options
   */
  class Sidebar {
    constructor(el, options = {}) {
      this.sidebarEL =
        el instanceof HTMLElement ? el : document.querySelector(el);
      this.options = options;
      this.init();
    }

    /**
     * initialize the sidebar
     */
    init() {
      // add event listener to sidebar
      document
        .querySelectorAll("#toggleSidebar")
        .forEach((el) => el.addEventListener("click", this.toggle.bind(this)));
      document
        .querySelectorAll(".sidebar-hide")
        .forEach((el) => el.addEventListener("click", this.toggle.bind(this)));
      window.addEventListener("resize", this.onResize.bind(this));

      const toggleSubmenu = (el) => {
        if (el.classList.contains("submenu-open")) {
          el.classList.remove("submenu-open");
          el.classList.add("submenu-closed");
        } else {
          el.classList.remove("submenu-closed");
          el.classList.add("submenu-open");
        }
      };

      let sidebarItems = document.querySelectorAll(".sidebar-item.has-sub");
      for (var i = 0; i < sidebarItems.length; i++) {
        let sidebarItem = sidebarItems[i];

        sidebarItems[i]
          .querySelector(".sidebar-link")
          .addEventListener("click", (e) => {
            e.preventDefault();
            let submenu = sidebarItem.querySelector(".submenu");
            toggleSubmenu(submenu);
          });

        // If submenu has submenu
        const submenuItems = sidebarItem.querySelectorAll(
          ".submenu-item.has-sub"
        );
        submenuItems.forEach((item) => {
          item.addEventListener("click", () => {
            const submenuLevelTwo = item.querySelector(".submenu");
            toggleSubmenu(submenuLevelTwo);

            // Pass second .submenu
            const height = calculateChildrenHeight(item.parentElement, true);
          });
        });
      }

      // Perfect Scrollbar Init
      if (typeof PerfectScrollbar == "function") {
        const container = document.querySelector(".sidebar-wrapper");
        const ps = new PerfectScrollbar(container, {
          wheelPropagation: false,
        });
      }

      // Scroll into active sidebar
      setTimeout(() => {
        this.forceElementVisibility(
          document.querySelector(".sidebar-item.active")
        );
      }, 300);
    }

    /**
     * On Sidebar Rezise Event
     */
    onResize() {
      if (isDesktop(window)) {
        this.sidebarEL.classList.add("active");
      } else {
        this.sidebarEL.classList.remove("active");
      }

      // reset
      this.deleteBackdrop();
      this.toggleOverflowBody(true);
    }

    /**
     * Toggle Sidebar
     */
    toggle() {
      const sidebarState = this.sidebarEL.classList.contains("active");
      if (sidebarState) {
        this.hide();
      } else {
        this.show();
      }
    }

    /**
     * Show Sidebar
     */
    show() {
      this.sidebarEL.classList.add("active");
      this.sidebarEL.classList.remove("inactive");
      this.createBackdrop();
      this.toggleOverflowBody();
    }

    /**
     * Hide Sidebar
     */
    hide() {
      this.sidebarEL.classList.remove("active");
      this.sidebarEL.classList.add("inactive");
      this.deleteBackdrop();
      this.toggleOverflowBody();
    }

    /**
     * Create Sidebar Backdrop
     */
    createBackdrop() {
      if (isDesktop(window)) return;
      this.deleteBackdrop();
      const backdrop = document.createElement("div");
      backdrop.classList.add("sidebar-backdrop");
      backdrop.addEventListener("click", this.hide.bind(this));
      document.body.appendChild(backdrop);
    }

    /**
     * Delete Sidebar Backdrop
     */
    deleteBackdrop() {
      const backdrop = document.querySelector(".sidebar-backdrop");
      if (backdrop) {
        backdrop.remove();
      }
    }

    /**
     * Toggle Overflow Body
     */
    toggleOverflowBody(active) {
      if (isDesktop(window)) return;
      const sidebarState = this.sidebarEL.classList.contains("active");
      const body = document.querySelector("body");
      if (typeof active == "undefined") {
        body.style.overflowY = sidebarState ? "hidden" : "auto";
      } else {
        body.style.overflowY = active ? "auto" : "hidden";
      }
    }

    isElementInViewport(el) {
      var rect = el.getBoundingClientRect();

      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      );
    }

    forceElementVisibility(el) {
      if (!this.isElementInViewport(el)) {
        el.scrollIntoView(false);
      }
    }
  }

  let sidebarEl = document.getElementById("sidebar");
//   console.log("sidebarel", sidebarEl);

  /**
   * On First Load
   */
  const onFirstLoad = (sidebarEL) => {
    if (!sidebarEl) return;
    if (isDesktop(window)) {
      sidebarEL.classList.add("active");
      sidebarEL.classList.add("sidebar-desktop");
    }

    // Get submenus size
    let submenus = document.querySelectorAll(".sidebar-item.has-sub .submenu");
    for (var i = 0; i < submenus.length; i++) {
      let submenu = submenus[i];
      const sidebarItem = submenu.parentElement;
      const height = submenu.clientHeight;

      if (sidebarItem.classList.contains("active"))
        submenu.classList.add("submenu-open");
      else submenu.classList.add("submenu-closed");
      setTimeout(() => {
        const height = calculateChildrenHeight(submenu, true);
      }, 50);
    }
  };

  if (document.readyState !== "loading") {
    onFirstLoad(sidebarEl);
  } else {
    window.addEventListener("DOMContentLoaded", () => onFirstLoad(sidebarEl));
  }
  /**
   * Create Sidebar Wrapper
   */
  if (sidebarEl) {
    window.sidebar = new Sidebar(sidebarEl);
  }
});
</script>

<template>
  <div class="sidebar-wrapper mini active">
    <div class="sidebar-header position-relative">
      <div class="d-flex justify-content-between align-items-center">
        <div class="logo">
          <a href="index.html"
            ><img
              src="@/assets/static/images/logo/logo.svg"
              alt="Logo"
              srcset=""
          /></a>
        </div>
        <div class="theme-toggle d-flex gap-2 align-items-center mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            class="iconify iconify--system-uicons"
            width="20"
            height="20"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 21 21"
          >
            <g
              fill="none"
              fill-rule="evenodd"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M10.5 14.5c2.219 0 4-1.763 4-3.982a4.003 4.003 0 0 0-4-4.018c-2.219 0-4 1.781-4 4c0 2.219 1.781 4 4 4zM4.136 4.136L5.55 5.55m9.9 9.9l1.414 1.414M1.5 10.5h2m14 0h2M4.135 16.863L5.55 15.45m9.899-9.9l1.414-1.415M10.5 19.5v-2m0-14v-2"
                opacity=".3"
              ></path>
              <g transform="translate(-210 -1)">
                <path d="M220.5 2.5v2m6.5.5l-1.5 1.5"></path>
                <circle cx="220.5" cy="11.5" r="4"></circle>
                <path
                  d="m214 5l1.5 1.5m5 14v-2m6.5-.5l-1.5-1.5M214 18l1.5-1.5m-4-5h2m14 0h2"
                ></path>
              </g>
            </g>
          </svg>
          <div class="form-check form-switch fs-6">
            <input
              class="form-check-input me-0"
              type="checkbox"
              id="toggle-dark"
              style="cursor: pointer"
            />
            <label class="form-check-label"></label>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            class="iconify iconify--mdi"
            width="20"
            height="20"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m17.75 4.09l-2.53 1.94l.91 3.06l-2.63-1.81l-2.63 1.81l.91-3.06l-2.53-1.94L12.44 4l1.06-3l1.06 3l3.19.09m3.5 6.91l-1.64 1.25l.59 1.98l-1.7-1.17l-1.7 1.17l.59-1.98L15.75 11l2.06-.05L18.5 9l.69 1.95l2.06.05m-2.28 4.95c.83-.08 1.72 1.1 1.19 1.85c-.32.45-.66.87-1.08 1.27C15.17 23 8.84 23 4.94 19.07c-3.91-3.9-3.91-10.24 0-14.14c.4-.4.82-.76 1.27-1.08c.75-.53 1.93.36 1.85 1.19c-.27 2.86.69 5.83 2.89 8.02a9.96 9.96 0 0 0 8.02 2.89m-1.64 2.02a12.08 12.08 0 0 1-7.8-3.47c-2.17-2.19-3.33-5-3.49-7.82c-2.81 3.14-2.7 7.96.31 10.98c3.02 3.01 7.84 3.12 10.98.31Z"
            ></path>
          </svg>
        </div>
        <div class="sidebar-toggler x">
          <a href="#" class="sidebar-hide d-xl-none d-block"
            ><i class="bi bi-x bi-middle"></i
          ></a>
        </div>
      </div>
    </div>
    <div class="sidebar-menu" id="x">
      <ul class="menu">
        <li class="sidebar-title">Menus</li>

        <router-link
          to="/"
          v-slot="{ href, route, navigate, isActive, isExactActive }"
          custom
        >
          <li
            :class="[isActive && 'active']"
            class="sidebar-item"
          >
            <a :href="href" @click="navigate" class="sidebar-link"><i class="bi bi-grid-fill"></i><span>{{ route.name }}</span></a>
          </li>
        </router-link>

        <router-link
          to="/finance"
          v-slot="{ href, route, navigate, isActive, isExactActive }"
          custom
        >
          <li
            :class="[isActive && 'active']"
            class="sidebar-item"
          >
            <a :href="href" @click="navigate" class="sidebar-link"><i class="bi bi-wallet-fill"></i><span>{{ route.name }}</span></a>
          </li>
        </router-link>


        <li class="sidebar-item has-sub">
          <a href="#" class="sidebar-link">
            <i class="bi bi-stack"></i>
            <span>Components</span>
          </a>

          <ul class="submenu">
            <li class="submenu-item">
              <a href="component-accordion.html" class="submenu-link"
                >Accordion</a
              >
            </li>

            <li class="submenu-item">
              <a href="component-alert.html" class="submenu-link">Alert</a>
            </li>

            <li class="submenu-item">
              <a href="component-badge.html" class="submenu-link">Badge</a>
            </li>

            <li class="submenu-item">
              <a href="component-breadcrumb.html" class="submenu-link"
                >Breadcrumb</a
              >
            </li>

            <li class="submenu-item">
              <a href="component-button.html" class="submenu-link">Button</a>
            </li>

            <li class="submenu-item">
              <a href="component-card.html" class="submenu-link">Card</a>
            </li>

            <li class="submenu-item">
              <a href="component-carousel.html" class="submenu-link"
                >Carousel</a
              >
            </li>

            <li class="submenu-item">
              <a href="component-collapse.html" class="submenu-link"
                >Collapse</a
              >
            </li>

            <li class="submenu-item">
              <a href="component-dropdown.html" class="submenu-link"
                >Dropdown</a
              >
            </li>

            <li class="submenu-item">
              <a href="component-list-group.html" class="submenu-link"
                >List Group</a
              >
            </li>

            <li class="submenu-item">
              <a href="component-modal.html" class="submenu-link">Modal</a>
            </li>

            <li class="submenu-item">
              <a href="component-navs.html" class="submenu-link">Navs</a>
            </li>

            <li class="submenu-item">
              <a href="component-pagination.html" class="submenu-link"
                >Pagination</a
              >
            </li>

            <li class="submenu-item">
              <a href="component-progress.html" class="submenu-link"
                >Progress</a
              >
            </li>

            <li class="submenu-item">
              <a href="component-spinner.html" class="submenu-link">Spinner</a>
            </li>

            <li class="submenu-item">
              <a href="component-toasts.html" class="submenu-link">Toasts</a>
            </li>

            <li class="submenu-item">
              <a href="component-tooltip.html" class="submenu-link">Tooltip</a>
            </li>
          </ul>
        </li>

        <li class="sidebar-item has-sub">
          <a href="#" class="sidebar-link">
            <i class="bi bi-collection-fill"></i>
            <span>Extra Components</span>
          </a>

          <ul class="submenu">
            <li class="submenu-item">
              <a href="extra-component-avatar.html" class="submenu-link"
                >Avatar</a
              >
            </li>

            <li class="submenu-item">
              <a href="extra-component-divider.html" class="submenu-link"
                >Divider</a
              >
            </li>

            <li class="submenu-item">
              <a href="extra-component-date-picker.html" class="submenu-link"
                >Date Picker</a
              >
            </li>

            <li class="submenu-item">
              <a href="extra-component-sweetalert.html" class="submenu-link"
                >Sweet Alert</a
              >
            </li>

            <li class="submenu-item">
              <a href="extra-component-toastify.html" class="submenu-link"
                >Toastify</a
              >
            </li>

            <li class="submenu-item">
              <a href="extra-component-rating.html" class="submenu-link"
                >Rating</a
              >
            </li>
          </ul>
        </li>

        <li class="sidebar-item has-sub">
          <a href="#" class="sidebar-link">
            <i class="bi bi-grid-1x2-fill"></i>
            <span>Layouts</span>
          </a>

          <ul class="submenu">
            <li class="submenu-item">
              <a href="layout-default.html" class="submenu-link"
                >Default Layout</a
              >
            </li>

            <li class="submenu-item">
              <a href="layout-vertical-1-column.html" class="submenu-link"
                >1 Column</a
              >
            </li>

            <li class="submenu-item">
              <a href="layout-vertical-navbar.html" class="submenu-link"
                >Vertical Navbar</a
              >
            </li>

            <li class="submenu-item">
              <a href="layout-rtl.html" class="submenu-link">RTL Layout</a>
            </li>

            <li class="submenu-item">
              <a href="layout-horizontal.html" class="submenu-link"
                >Horizontal Menu</a
              >
            </li>
          </ul>
        </li>

        <li class="sidebar-title">Forms &amp; Tables</li>

        <li class="sidebar-item has-sub">
          <a href="#" class="sidebar-link">
            <i class="bi bi-hexagon-fill"></i>
            <span>Form Elements</span>
          </a>

          <ul class="submenu">
            <li class="submenu-item">
              <a href="form-element-input.html" class="submenu-link">Input</a>
            </li>

            <li class="submenu-item">
              <a href="form-element-input-group.html" class="submenu-link"
                >Input Group</a
              >
            </li>

            <li class="submenu-item">
              <a href="form-element-select.html" class="submenu-link">Select</a>
            </li>

            <li class="submenu-item">
              <a href="form-element-radio.html" class="submenu-link">Radio</a>
            </li>

            <li class="submenu-item">
              <a href="form-element-checkbox.html" class="submenu-link"
                >Checkbox</a
              >
            </li>

            <li class="submenu-item">
              <a href="form-element-textarea.html" class="submenu-link"
                >Textarea</a
              >
            </li>
          </ul>
        </li>

        <li class="sidebar-item">
          <a href="form-layout.html" class="sidebar-link">
            <i class="bi bi-file-earmark-medical-fill"></i>
            <span>Form Layout</span>
          </a>
        </li>

        <li class="sidebar-item has-sub">
          <a href="#" class="sidebar-link">
            <i class="bi bi-journal-check"></i>
            <span>Form Validation</span>
          </a>

          <ul class="submenu">
            <li class="submenu-item">
              <a href="form-validation-parsley.html" class="submenu-link"
                >Parsley</a
              >
            </li>
          </ul>
        </li>

        <li class="sidebar-item has-sub">
          <a href="#" class="sidebar-link">
            <i class="bi bi-pen-fill"></i>
            <span>Form Editor</span>
          </a>

          <ul class="submenu">
            <li class="submenu-item">
              <a href="form-editor-quill.html" class="submenu-link">Quill</a>
            </li>

            <li class="submenu-item">
              <a href="form-editor-ckeditor.html" class="submenu-link"
                >CKEditor</a
              >
            </li>

            <li class="submenu-item">
              <a href="form-editor-summernote.html" class="submenu-link"
                >Summernote</a
              >
            </li>

            <li class="submenu-item">
              <a href="form-editor-tinymce.html" class="submenu-link"
                >TinyMCE</a
              >
            </li>
          </ul>
        </li>

        <li class="sidebar-item">
          <a href="table.html" class="sidebar-link">
            <i class="bi bi-grid-1x2-fill"></i>
            <span>Table</span>
          </a>
        </li>

        <li class="sidebar-item has-sub">
          <a href="#" class="sidebar-link">
            <i class="bi bi-file-earmark-spreadsheet-fill"></i>
            <span>Datatables</span>
          </a>

          <ul class="submenu">
            <li class="submenu-item">
              <a href="table-datatable.html" class="submenu-link">Datatable</a>
            </li>

            <li class="submenu-item">
              <a href="table-datatable-jquery.html" class="submenu-link"
                >Datatable (jQuery)</a
              >
            </li>
          </ul>
        </li>

        <li class="sidebar-title">Extra UI</li>

        <li class="sidebar-item has-sub">
          <a href="#" class="sidebar-link">
            <i class="bi bi-pentagon-fill"></i>
            <span>Widgets</span>
          </a>

          <ul class="submenu">
            <li class="submenu-item">
              <a href="ui-widgets-chatbox.html" class="submenu-link">Chatbox</a>
            </li>

            <li class="submenu-item">
              <a href="ui-widgets-pricing.html" class="submenu-link">Pricing</a>
            </li>

            <li class="submenu-item">
              <a href="ui-widgets-todolist.html" class="submenu-link"
                >To-do List</a
              >
            </li>
          </ul>
        </li>

        <li class="sidebar-item has-sub">
          <a href="#" class="sidebar-link">
            <i class="bi bi-egg-fill"></i>
            <span>Icons</span>
          </a>

          <ul class="submenu">
            <li class="submenu-item">
              <a href="ui-icons-bootstrap-icons.html" class="submenu-link"
                >Bootstrap Icons
              </a>
            </li>

            <li class="submenu-item">
              <a href="ui-icons-fontawesome.html" class="submenu-link"
                >Fontawesome</a
              >
            </li>

            <li class="submenu-item">
              <a href="ui-icons-dripicons.html" class="submenu-link"
                >Dripicons</a
              >
            </li>
          </ul>
        </li>

        <li class="sidebar-item has-sub">
          <a href="#" class="sidebar-link">
            <i class="bi bi-bar-chart-fill"></i>
            <span>Charts</span>
          </a>

          <ul class="submenu">
            <li class="submenu-item">
              <a href="ui-chart-chartjs.html" class="submenu-link">ChartJS</a>
            </li>

            <li class="submenu-item">
              <a href="ui-chart-apexcharts.html" class="submenu-link"
                >Apexcharts</a
              >
            </li>
          </ul>
        </li>

        <li class="sidebar-item">
          <a href="ui-file-uploader.html" class="sidebar-link">
            <i class="bi bi-cloud-arrow-up-fill"></i>
            <span>File Uploader</span>
          </a>
        </li>

        <li class="sidebar-item has-sub">
          <a href="#" class="sidebar-link">
            <i class="bi bi-map-fill"></i>
            <span>Maps</span>
          </a>

          <ul class="submenu">
            <li class="submenu-item">
              <a href="ui-map-google-map.html" class="submenu-link"
                >Google Map</a
              >
            </li>

            <li class="submenu-item">
              <a href="ui-map-jsvectormap.html" class="submenu-link"
                >JS Vector Map</a
              >
            </li>
          </ul>
        </li>

        <li class="sidebar-item has-sub">
          <a href="#" class="sidebar-link">
            <i class="bi bi-three-dots"></i>
            <span>Multi-level Menu</span>
          </a>

          <ul class="submenu">
            <li class="submenu-item has-sub">
              <a href="#" class="submenu-link">First Level</a>

              <ul class="submenu submenu-level-2">
                <li class="submenu-item">
                  <a href="ui-multi-level-menu.html" class="submenu-link"
                    >Second Level</a
                  >
                </li>

                <li class="submenu-item">
                  <a href="#" class="submenu-link">Second Level Menu</a>
                </li>
              </ul>
            </li>

            <li class="submenu-item has-sub">
              <a href="#" class="submenu-link">Another Menu</a>

              <ul class="submenu submenu-level-2">
                <li class="submenu-item">
                  <a href="#" class="submenu-link">Second Level Menu</a>
                </li>
              </ul>
            </li>
          </ul>
        </li>

        <li class="sidebar-title">Pages</li>

        <li class="sidebar-item">
          <a href="application-email.html" class="sidebar-link">
            <i class="bi bi-envelope-fill"></i>
            <span>Email Application</span>
          </a>
        </li>

        <li class="sidebar-item">
          <a href="application-chat.html" class="sidebar-link">
            <i class="bi bi-chat-dots-fill"></i>
            <span>Chat Application</span>
          </a>
        </li>

        <li class="sidebar-item">
          <a href="application-gallery.html" class="sidebar-link">
            <i class="bi bi-image-fill"></i>
            <span>Photo Gallery</span>
          </a>
        </li>

        <li class="sidebar-item">
          <a href="application-checkout.html" class="sidebar-link">
            <i class="bi bi-basket-fill"></i>
            <span>Checkout Page</span>
          </a>
        </li>

        <li class="sidebar-item has-sub">
          <a href="#" class="sidebar-link">
            <i class="bi bi-person-badge-fill"></i>
            <span>Authentication</span>
          </a>

          <ul class="submenu">
            <li class="submenu-item">
              <a href="auth-login.html" class="submenu-link">Login</a>
            </li>

            <li class="submenu-item">
              <a href="auth-register.html" class="submenu-link">Register</a>
            </li>

            <li class="submenu-item">
              <a href="auth-forgot-password.html" class="submenu-link"
                >Forgot Password</a
              >
            </li>
          </ul>
        </li>

        <li class="sidebar-item has-sub">
          <a href="#" class="sidebar-link">
            <i class="bi bi-x-octagon-fill"></i>
            <span>Errors</span>
          </a>

          <ul class="submenu">
            <li class="submenu-item">
              <a href="error-403.html" class="submenu-link">403</a>
            </li>

            <li class="submenu-item">
              <a href="error-404.html" class="submenu-link">404</a>
            </li>

            <li class="submenu-item">
              <a href="error-500.html" class="submenu-link">500</a>
            </li>
          </ul>
        </li>

        <li class="sidebar-title">Raise Support</li>

        <li class="sidebar-item">
          <a href="https://zuramai.github.io/mazer/docs" class="sidebar-link">
            <i class="bi bi-life-preserver"></i>
            <span>Documentation</span>
          </a>
        </li>

        <li class="sidebar-item">
          <a
            href="https://github.com/zuramai/mazer/blob/main/CONTRIBUTING.md"
            class="sidebar-link"
          >
            <i class="bi bi-puzzle"></i>
            <span>Contribute</span>
          </a>
        </li>

        <li class="sidebar-item">
          <a
            href="https://github.com/zuramai/mazer#donation"
            class="sidebar-link"
          >
            <i class="bi bi-cash"></i>
            <span>Donate</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
