export interface MenuItems {
  name: string;
  route: string;
  icon?: string;
  activeIcon?: string;
  authorize?: string;
}

export interface MenuList {
  header?: string;
  menuItems: MenuItems[];
  headerViewPermission?: string;
}
