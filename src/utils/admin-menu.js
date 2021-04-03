import { i18n } from "src/boot/i18n";

export const get = () => [
  {
    icon: "fa fa-heartbeat",
    label: i18n.t("settingsLayoutSidebar-activityTypesLink"),
    separator: true,
    path: { path: "/settings/activity-types" }
  },
  {
    icon: "fa fa-database",
    label: i18n.t("settingsLayoutSidebar-dataLink"),
    separator: true,
    path: { path: "/settings/data" }
  },
  {
    icon: "fa fa-calendar",
    label: i18n.t("settingsLayoutSidebar-dateTimeLink"),
    separator: true,
    path: { path: "/settings/date-time" }
  },
  {
    icon: "fa fa-user-md",
    label: i18n.t("settingsLayoutSidebar-rolesLink"),
    separator: true,
    path: { path: "/settings/roles" }
  },
  {
    icon: "fa fa-th-list",
    label: i18n.t("settingsLayoutSidebar-eventLogLink"),
    separator: true,
    path: { path: "/settings/event-log" }
  },
  {
    icon: "fa fa-users",
    label: i18n.t("settingsLayoutSidebar-usersLink"),
    separator: true,
    path: { path: "/settings/users" }
  }
];
