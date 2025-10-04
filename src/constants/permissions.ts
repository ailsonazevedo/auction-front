const USER_PERMISSIONS = {
  DELETE_OWN_PROFILE: "delete_own_profile",
  EDIT_OWN_PROFILE: "edit_own_profile",
  LIST_OPEN_AUCTIONS: "list_open_auctions",
  PLACE_BID: "place_bid",
  RECEIVE_NOTIFICATIONS: "receive_notifications",
  VIEW_OWN_BID_HISTORY: "view_own_bid_history",
  VIEW_OWN_PROFILE: "view_own_profile",
};

const ADMIN_PERMISSIONS = {
  ...USER_PERMISSIONS,
  CREATE_AUCTION: "create_auction",
  CREATE_PORTFOLIO: "create_portfolio",
  DELETE_ALL_PROFILES: "delete_all_profiles",
  DELETE_PORTFOLIO: "delete_portfolio",
  EDIT_ALL_PROFILES: "edit_all_profiles",
  EDIT_PORTFOLIO: "edit_portfolio",
  IMPORT_PORTFOLIO_CSV: "import_portfolio_csv",
  MANAGE: "manage",
  VIEW_ALL_BIDS: "view_all_bids",
  VIEW_ALL_PROFILES: "view_all_profiles",
};

export { ADMIN_PERMISSIONS, USER_PERMISSIONS };
