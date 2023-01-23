export class SettingsMultiSelect {
    singleSelection: boolean = false;
    idField: string = "filtroId";
    textField: string = "filtro";
    enableCheckAll: boolean = false;
    allowSearchFilter: boolean = false;
    limitSelection: number = -1;
    clearSearchFilter: boolean = true;
    maxHeight: string = "100%";
    itemsShowLimit: number = 3;
    searchPlaceholderText: string = "Buscar";
    noDataAvailablePlaceholderText: string = "";
    closeDropDownOnSelection: boolean = false;
    showSelectedItemsAtTop: boolean = false;
    defaultOpen: boolean = false;
};