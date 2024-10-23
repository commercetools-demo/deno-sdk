import type { Message } from "../../clientsdk.ts"

export enum EventTypes {
	All = "All",
	ApprovalFlowApproved = "ApprovalFlowApproved",
	ApprovalFlowCompleted = "ApprovalFlowCompleted",
	ApprovalFlowCreated = "ApprovalFlowCreated",
	ApprovalFlowRejected = "ApprovalFlowRejected",
	ApprovalFlow = "ApprovalFlow",

	ApprovalRuleApproversSet = "ApprovalRuleApproversSet",
	ApprovalRuleCreated = "ApprovalRuleCreated",
	ApprovalRuleDescriptionSet = "ApprovalRuleDescriptionSet",
	ApprovalRuleKeySet = "ApprovalRuleKeySet",
	ApprovalRuleNameSet = "ApprovalRuleNameSet",
	ApprovalRulePredicateSet = "ApprovalRulePredicateSet",
	ApprovalRuleRequestersSet = "ApprovalRuleRequestersSet",
	ApprovalRuleStatusSet = "ApprovalRuleStatusSet",
	ApprovalRule = "ApprovalRule",

	AssociateRoleBuyerAssignableChanged = "AssociateRoleBuyerAssignableChanged",
	AssociateRoleCreated = "AssociateRoleCreated",
	AssociateRoleDeleted = "AssociateRoleDeleted",
	AssociateRoleNameSet = "AssociateRoleNameSet",
	AssociateRolePermissionAdded = "AssociateRolePermissionAdded",
	AssociateRolePermissionRemoved = "AssociateRolePermissionRemoved",
	AssociateRolePermissionsSet = "AssociateRolePermissionsSet",
	AssociateRole = "AssociateRole",

	BusinessUnitAddressAdded = "BusinessUnitAddressAdded",
	BusinessUnitAddressChanged = "BusinessUnitAddressChanged",
	BusinessUnitAddressCustomFieldAdded = "BusinessUnitAddressCustomFieldAdded",
	BusinessUnitAddressCustomFieldChanged = "BusinessUnitAddressCustomFieldChanged",
	BusinessUnitAddressCustomFieldRemoved = "BusinessUnitAddressCustomFieldRemoved",
	BusinessUnitAddressCustomTypeRemoved = "BusinessUnitAddressCustomTypeRemoved",
	BusinessUnitAddressCustomTypeSet = "BusinessUnitAddressCustomTypeSet",
	BusinessUnitAddressRemoved = "BusinessUnitAddressRemoved",
	BusinessUnitAddress = "BusinessUnitAddress",

	BusinessUnitAssociateAdded = "BusinessUnitAssociateAdded",
	BusinessUnitAssociateChanged = "BusinessUnitAssociateChanged",
	BusinessUnitAssociateModeChanged = "BusinessUnitAssociateModeChanged",
	BusinessUnitAssociateRemoved = "BusinessUnitAssociateRemoved",
	BusinessUnitAssociatesSet = "BusinessUnitAssociatesSet",
	BusinessUnitAssociate = "BusinessUnitAssociate",

	BusinessUnitBillingAddressAdded = "BusinessUnitBillingAddressAdded",
	BusinessUnitBillingAddressRemoved = "BusinessUnitBillingAddressRemoved",
	BusinessUnitBillingAddress = "BusinessUnitBillingAddress",

	BusinessUnitContactEmailSet = "BusinessUnitContactEmailSet",

	BusinessUnitCreated = "BusinessUnitCreated",

	BusinessUnitCustomFieldAdded = "BusinessUnitCustomFieldAdded",
	BusinessUnitCustomFieldChanged = "BusinessUnitCustomFieldChanged",
	BusinessUnitCustomFieldRemoved = "BusinessUnitCustomFieldRemoved",
	BusinessUnitCustomField = "BusinessUnitCustomField",

	BusinessUnitCustomTypeRemoved = "BusinessUnitCustomTypeRemoved",
	BusinessUnitCustomTypeSet = "BusinessUnitCustomTypeSet",
	BusinessUnitCustomType = "BusinessUnitCustomType",

	BusinessUnitDefaultBillingAddressSet = "BusinessUnitDefaultBillingAddressSet",
	BusinessUnitDefaultShippingAddressSet = "BusinessUnitDefaultShippingAddressSet",
	BusinessUnitDeleted = "BusinessUnitDeleted",
	BusinessUnitNameChanged = "BusinessUnitNameChanged",
	BusinessUnitParentChanged = "BusinessUnitParentChanged",
	BusinessUnitShippingAddressAdded = "BusinessUnitShippingAddressAdded",
	BusinessUnitShippingAddressRemoved = "BusinessUnitShippingAddressRemoved",
	BusinessUnitStatusChanged = "BusinessUnitStatusChanged",
	BusinessUnitStoreAdded = "BusinessUnitStoreAdded",
	BusinessUnitStoreModeChanged = "BusinessUnitStoreModeChanged",
	BusinessUnitStoreRemoved = "BusinessUnitStoreRemoved",
	BusinessUnitStoresSet = "BusinessUnitStoresSet",
	BusinessUnit = "BusinessUnit",

	CategoryCreated = "CategoryCreated",
	CategorySlugChanged = "CategorySlugChanged",
	Category = "Category",

	CustomLineItemStateTransition = "CustomLineItemStateTransition",

	CustomerAddressAdded = "CustomerAddressAdded",
	CustomerAddressChanged = "CustomerAddressChanged",
	CustomerAddressCustomFieldAdded = "CustomerAddressCustomFieldAdded",
	CustomerAddressCustomFieldChanged = "CustomerAddressCustomFieldChanged",
	CustomerAddressCustomFieldRemoved = "CustomerAddressCustomFieldRemoved",
	CustomerAddressCustomTypeRemoved = "CustomerAddressCustomTypeRemoved",
	CustomerAddressCustomTypeSet = "CustomerAddressCustomTypeSet",
	CustomerAddressRemoved = "CustomerAddressRemoved",
	CustomerAddress = "CustomerAddress",

	CustomerCompanyNameSet = "CustomerCompanyNameSet",
	CustomerCreated = "CustomerCreated",
	CustomerCustomFieldAdded = "CustomerCustomFieldAdded",
	CustomerCustomFieldChanged = "CustomerCustomFieldChanged",
	CustomerCustomFieldRemoved = "CustomerCustomFieldRemoved",
	CustomerCustomTypeRemoved = "CustomerCustomTypeRemoved",
	CustomerCustomTypeSet = "CustomerCustomTypeSet",
	CustomerDateOfBirthSet = "CustomerDateOfBirthSet",
	CustomerDeleted = "CustomerDeleted",
	CustomerEmailChanged = "CustomerEmailChanged",
	CustomerEmailTokenCreated = "CustomerEmailTokenCreated",
	CustomerEmailVerified = "CustomerEmailVerified",
	CustomerFirstNameSet = "CustomerFirstNameSet",
	CustomerGroupCustomFieldAdded = "CustomerGroupCustomFieldAdded",
	CustomerGroupCustomFieldChanged = "CustomerGroupCustomFieldChanged",
	CustomerGroupCustomFieldRemoved = "CustomerGroupCustomFieldRemoved",
	CustomerGroupCustomTypeRemoved = "CustomerGroupCustomTypeRemoved",
	CustomerGroupCustomTypeSet = "CustomerGroupCustomTypeSet",
	CustomerGroupSet = "CustomerGroupSet",
	CustomerLastNameSet = "CustomerLastNameSet",
	CustomerPasswordTokenCreated = "CustomerPasswordTokenCreated",
	CustomerPasswordUpdated = "CustomerPasswordUpdated",
	CustomerTitleSet = "CustomerTitleSet",
	Customer = "Customer",

	DeliveryAdded = "DeliveryAdded",
	DeliveryAddressSet = "DeliveryAddressSet",
	DeliveryItemsUpdated = "DeliveryItemsUpdated",
	DeliveryRemoved = "DeliveryRemoved",
	Delivery = "Delivery",

	InventoryEntryCreated = "InventoryEntryCreated",
	InventoryEntryDeleted = "InventoryEntryDeleted",
	InventoryEntryQuantitySet = "InventoryEntryQuantitySet",
	Inventory = "Inventory",

	LineItemStateTransition = "LineItemStateTransition",
	OrderBillingAddressSet = "OrderBillingAddressSet",
	OrderCreated = "OrderCreated",
	OrderCustomFieldAdded = "OrderCustomFieldAdded",
	OrderCustomFieldChanged = "OrderCustomFieldChanged",
	OrderCustomFieldRemoved = "OrderCustomFieldRemoved",
	OrderCustomLineItemAdded = "OrderCustomLineItemAdded",
	OrderCustomLineItemDiscountSet = "OrderCustomLineItemDiscountSet",
	OrderCustomLineItemQuantityChanged = "OrderCustomLineItemQuantityChanged",
	OrderCustomLineItemRemoved = "OrderCustomLineItemRemoved",
	OrderCustomTypeRemoved = "OrderCustomTypeRemoved",
	OrderCustomTypeSet = "OrderCustomTypeSet",
	OrderCustomerEmailSet = "OrderCustomerEmailSet",
	OrderCustomerGroupSet = "OrderCustomerGroupSet",
	OrderCustomerSet = "OrderCustomerSet",
	OrderDeleted = "OrderDeleted",
	OrderDiscountCodeAdded = "OrderDiscountCodeAdded",
	OrderDiscountCodeRemoved = "OrderDiscountCodeRemoved",
	OrderDiscountCodeStateSet = "OrderDiscountCodeStateSet",
	OrderEditApplied = "OrderEditApplied",
	OrderImported = "OrderImported",
	OrderLineItemAdded = "OrderLineItemAdded",
	OrderLineItemDiscountSet = "OrderLineItemDiscountSet",
	OrderLineItemDistributionChannelSet = "OrderLineItemDistributionChannelSet",
	OrderLineItemRemoved = "OrderLineItemRemoved",
	OrderPaymentStateChanged = "OrderPaymentStateChanged",
	OrderPurchaseOrderNumberSet = "OrderPurchaseOrderNumberSet",
	OrderReturnShipmentStateChanged = "OrderReturnShipmentStateChanged",
	OrderShipmentStateChanged = "OrderShipmentStateChanged",
	OrderShippingAddressSet = "OrderShippingAddressSet",
	OrderShippingInfoSet = "OrderShippingInfoSet",
	OrderShippingRateInputSet = "OrderShippingRateInputSet",
	OrderStateChanged = "OrderStateChanged",
	OrderStateTransition = "OrderStateTransition",
	OrderStoreSet = "OrderStoreSet",
	Order = "Order",

	ParcelAddedToDelivery = "ParcelAddedToDelivery",
	ParcelItemsUpdated = "ParcelItemsUpdated",
	ParcelMeasurementsUpdated = "ParcelMeasurementsUpdated",
	ParcelRemovedFromDelivery = "ParcelRemovedFromDelivery",
	ParcelTrackingDataUpdated = "ParcelTrackingDataUpdated",
	Parcel = "Parcel",

	ReturnInfoAdded = "ReturnInfoAdded",
	ReturnInfoSet = "ReturnInfoSet",
	Return = "Return",

	OrderPaymentAdded = "OrderPaymentAdded",
	PaymentCreated = "PaymentCreated",
	PaymentInteractionAdded = "PaymentInteractionAdded",
	PaymentStatusInterfaceCodeSet = "PaymentStatusInterfaceCodeSet",
	PaymentStatusStateTransition = "PaymentStatusStateTransition",
	PaymentTransactionAdded = "PaymentTransactionAdded",
	PaymentTransactionStateChanged = "PaymentTransactionStateChanged",
	Payment = "Payment",

	ProductAddedToCategory = "ProductAddedToCategory",
	ProductCreated = "ProductCreated",
	ProductDeleted = "ProductDeleted",
	ProductImageAdded = "ProductImageAdded",
	ProductPriceAdded = "ProductPriceAdded",
	ProductPriceChanged = "ProductPriceChanged",
	ProductPriceDiscountsSet = "ProductPriceDiscountsSet",
	ProductPriceExternalDiscountSet = "ProductPriceExternalDiscountSet",
	ProductPriceKeySet = "ProductPriceKeySet",
	ProductPriceModeSet = "ProductPriceModeSet",
	ProductPriceRemoved = "ProductPriceRemoved",
	ProductPricesSet = "ProductPricesSet",
	ProductPublished = "ProductPublished",
	ProductRemovedFromCategory = "ProductRemovedFromCategory",
	ProductRevertedStagedChanges = "ProductRevertedStagedChanges",
	ProductSelectionCreated = "ProductSelectionCreated",
	ProductSelectionDeleted = "ProductSelectionDeleted",
	ProductSelectionProductAdded = "ProductSelectionProductAdded",
	ProductSelectionProductExcluded = "ProductSelectionProductExcluded",
	ProductSelectionProductRemoved = "ProductSelectionProductRemoved",
	ProductSelectionVariantExclusionChanged = "ProductSelectionVariantExclusionChanged",
	ProductSelectionVariantSelectionChanged = "ProductSelectionVariantSelectionChanged",
	ProductSlugChanged = "ProductSlugChanged",
	ProductStateTransition = "ProductStateTransition",
	ProductUnpublished = "ProductUnpublished",
	ProductVariantAdded = "ProductVariantAdded",
	ProductVariantDeleted = "ProductVariantDeleted",
	Product = "Product",

	QuoteCreated = "QuoteCreated",
	QuoteCustomerChanged = "QuoteCustomerChanged",
	QuoteDeleted = "QuoteDeleted",
	QuoteRenegotiationRequested = "QuoteRenegotiationRequested",
	QuoteRequestCreated = "QuoteRequestCreated",
	QuoteRequestCustomerChanged = "QuoteRequestCustomerChanged",
	QuoteRequestDeleted = "QuoteRequestDeleted",
	QuoteRequestStateChanged = "QuoteRequestStateChanged",
	QuoteRequestStateTransition = "QuoteRequestStateTransition",
	QuoteStateChanged = "QuoteStateChanged",
	QuoteStateTransition = "QuoteStateTransition",
	Quote = "Quote",

	ReviewCreated = "ReviewCreated",
	ReviewRatingSet = "ReviewRatingSet",
	ReviewStateTransition = "ReviewStateTransition",
	Review = "Review",

	StagedQuoteCreated = "StagedQuoteCreated",
	StagedQuoteDeleted = "StagedQuoteDeleted",
	StagedQuoteSellerCommentSet = "StagedQuoteSellerCommentSet",
	StagedQuoteStateChanged = "StagedQuoteStateChanged",
	StagedQuoteStateTransition = "StagedQuoteStateTransition",
	StagedQuoteValidToSet = "StagedQuoteValidToSet",
	StagedQuote = "StagedQuote",

	StandalonePriceActiveChanged = "StandalonePriceActiveChanged",
	StandalonePriceCreated = "StandalonePriceCreated",
	StandalonePriceDeleted = "StandalonePriceDeleted",
	StandalonePriceDiscountSet = "StandalonePriceDiscountSet",
	StandalonePriceExternalDiscountSet = "StandalonePriceExternalDiscountSet",
	StandalonePriceKeySet = "StandalonePriceKeySet",
	StandalonePriceStagedChangesApplied = "StandalonePriceStagedChangesApplied",
	StandalonePriceStagedChangesRemoved = "StandalonePriceStagedChangesRemoved",
	StandalonePriceTierAdded = "StandalonePriceTierAdded",
	StandalonePriceTierRemoved = "StandalonePriceTierRemoved",
	StandalonePriceTiersSet = "StandalonePriceTiersSet",
	StandalonePriceValidFromAndUntilSet = "StandalonePriceValidFromAndUntilSet",
	StandalonePriceValidFromSet = "StandalonePriceValidFromSet",
	StandalonePriceValidUntilSet = "StandalonePriceValidUntilSet",
	StandalonePriceValueChanged = "StandalonePriceValueChanged",
	StandalonePrice = "StandalonePrice",

	StoreCountriesChanged = "StoreCountriesChanged",
	StoreCreated = "StoreCreated",
	StoreDeleted = "StoreDeleted",
	StoreDistributionChannelsChanged = "StoreDistributionChannelsChanged",
	StoreLanguagesChanged = "StoreLanguagesChanged",
	StoreNameSet = "StoreNameSet",
	StoreProductSelectionsChanged = "StoreProductSelectionsChanged",
	StoreSupplyChannelsChanged = "StoreSupplyChannelsChanged",
	Store = "Store",
}

export const eventEmitter = (msg: Message): void => {
	switch (msg.type) {
		case "ApprovalFlowApproved":
		case "ApprovalFlowCompleted":
		case "ApprovalFlowCreated":
		case "ApprovalFlowRejected": {
			dispatchEvent(
				new CustomEvent(EventTypes.ApprovalFlow, { detail: msg }),
			)
			break
		}
		case "ApprovalRuleApproversSet":
		case "ApprovalRuleCreated":
		case "ApprovalRuleDescriptionSet":
		case "ApprovalRuleKeySet":
		case "ApprovalRuleNameSet":
		case "ApprovalRulePredicateSet":
		case "ApprovalRuleRequestersSet":
		case "ApprovalRuleStatusSet": {
			dispatchEvent(
				new CustomEvent(EventTypes.ApprovalRule, { detail: msg }),
			)
			break
		}
		case "AssociateRoleBuyerAssignableChanged":
		case "AssociateRoleCreated":
		case "AssociateRoleDeleted":
		case "AssociateRoleNameSet":
		case "AssociateRolePermissionAdded":
		case "AssociateRolePermissionRemoved":
		case "AssociateRolePermissionsSet": {
			dispatchEvent(
				new CustomEvent(EventTypes.AssociateRole, { detail: msg }),
			)
			break
		}
		case "BusinessUnitAddressAdded":
		case "BusinessUnitAddressChanged":
		case "BusinessUnitAddressCustomFieldAdded":
		case "BusinessUnitAddressCustomFieldChanged":
		case "BusinessUnitAddressCustomFieldRemoved":
		case "BusinessUnitAddressCustomTypeRemoved":
		case "BusinessUnitAddressCustomTypeSet":
		case "BusinessUnitAddressRemoved": {
			dispatchEvent(
				new CustomEvent(EventTypes.BusinessUnitAddress, { detail: msg }),
			)
			break
		}
		case "BusinessUnitAssociateAdded":
		case "BusinessUnitAssociateChanged":
		case "BusinessUnitAssociateModeChanged":
		case "BusinessUnitAssociateRemoved":
		case "BusinessUnitAssociatesSet": {
			dispatchEvent(
				new CustomEvent(EventTypes.BusinessUnitAssociate, { detail: msg }),
			)
			break
		}
		case "BusinessUnitBillingAddressAdded":
		case "BusinessUnitBillingAddressRemoved":
		case "BusinessUnitContactEmailSet":
		case "BusinessUnitCreated":
		case "BusinessUnitCustomFieldAdded":
		case "BusinessUnitCustomFieldChanged":
		case "BusinessUnitCustomFieldRemoved":
		case "BusinessUnitCustomTypeRemoved":
		case "BusinessUnitCustomTypeSet":
		case "BusinessUnitDefaultBillingAddressSet":
		case "BusinessUnitDefaultShippingAddressSet":
		case "BusinessUnitDeleted":
		case "BusinessUnitNameChanged":
		case "BusinessUnitParentChanged":
		case "BusinessUnitShippingAddressAdded":
		case "BusinessUnitShippingAddressRemoved":
		case "BusinessUnitStatusChanged":
		case "BusinessUnitStoreAdded":
		case "BusinessUnitStoreModeChanged":
		case "BusinessUnitStoreRemoved":
		case "BusinessUnitStoresSet": {
			dispatchEvent(
				new CustomEvent(EventTypes.BusinessUnit, { detail: msg }),
			)
			break
		}
		case "CategoryCreated":
		case "CategorySlugChanged": {
			dispatchEvent(new CustomEvent(EventTypes.Category, { detail: msg }))
			break
		}
		case "CustomLineItemStateTransition":
		case "CustomerAddressAdded":
		case "CustomerAddressChanged":
		case "CustomerAddressCustomFieldAdded":
		case "CustomerAddressCustomFieldChanged":
		case "CustomerAddressCustomFieldRemoved":
		case "CustomerAddressCustomTypeRemoved":
		case "CustomerAddressCustomTypeSet":
		case "CustomerAddressRemoved":
		case "CustomerCompanyNameSet":
		case "CustomerCreated":
		case "CustomerCustomFieldAdded":
		case "CustomerCustomFieldChanged":
		case "CustomerCustomFieldRemoved":
		case "CustomerCustomTypeRemoved":
		case "CustomerCustomTypeSet":
		case "CustomerDateOfBirthSet":
		case "CustomerDeleted":
		case "CustomerEmailChanged":
		case "CustomerEmailTokenCreated":
		case "CustomerEmailVerified":
		case "CustomerFirstNameSet":
		case "CustomerGroupCustomFieldAdded":
		case "CustomerGroupCustomFieldChanged":
		case "CustomerGroupCustomFieldRemoved":
		case "CustomerGroupCustomTypeRemoved":
		case "CustomerGroupCustomTypeSet":
		case "CustomerGroupSet":
		case "CustomerLastNameSet":
		case "CustomerPasswordTokenCreated":
		case "CustomerPasswordUpdated":
		case "CustomerTitleSet": {
			dispatchEvent(new CustomEvent(EventTypes.Customer, { detail: msg }))
			break
		}
		case "DeliveryAdded":
		case "DeliveryAddressSet":
		case "DeliveryItemsUpdated":
		case "DeliveryRemoved":
		case "InventoryEntryCreated":
		case "InventoryEntryDeleted":
		case "InventoryEntryQuantitySet": {
			dispatchEvent(new CustomEvent(EventTypes.Inventory, { detail: msg }))
			break
		}
		case "LineItemStateTransition":
		case "OrderBillingAddressSet":
		case "OrderCreated":
		case "OrderCustomFieldAdded":
		case "OrderCustomFieldChanged":
		case "OrderCustomFieldRemoved":
		case "OrderCustomLineItemAdded":
		case "OrderCustomLineItemDiscountSet":
		case "OrderCustomLineItemQuantityChanged":
		case "OrderCustomLineItemRemoved":
		case "OrderCustomTypeRemoved":
		case "OrderCustomTypeSet":
		case "OrderCustomerEmailSet":
		case "OrderCustomerGroupSet":
		case "OrderCustomerSet":
		case "OrderDeleted":
		case "OrderDiscountCodeAdded":
		case "OrderDiscountCodeRemoved":
		case "OrderDiscountCodeStateSet":
		case "OrderEditApplied":
		case "OrderImported":
		case "OrderLineItemAdded":
		case "OrderLineItemDiscountSet":
		case "OrderLineItemDistributionChannelSet":
		case "OrderLineItemRemoved":
		case "OrderPaymentStateChanged":
		case "OrderPurchaseOrderNumberSet":
		case "OrderReturnShipmentStateChanged":
		case "OrderShipmentStateChanged":
		case "OrderShippingAddressSet":
		case "OrderShippingInfoSet":
		case "OrderShippingRateInputSet":
		case "OrderStateChanged":
		case "OrderStateTransition":
		case "OrderStoreSet":
		case "OrderPaymentAdded": {
			dispatchEvent(new CustomEvent(EventTypes.Order, { detail: msg }))
			break
		}
		case "ParcelAddedToDelivery":
		case "ParcelItemsUpdated":
		case "ParcelMeasurementsUpdated":
		case "ParcelRemovedFromDelivery":
		case "ParcelTrackingDataUpdated": {
			dispatchEvent(new CustomEvent(EventTypes.Parcel, { detail: msg }))
			break
		}
		case "ReturnInfoAdded":
		case "ReturnInfoSet": {
			dispatchEvent(new CustomEvent(EventTypes.Return, { detail: msg }))
			break
		}
		case "PaymentCreated":
		case "PaymentInteractionAdded":
		case "PaymentStatusInterfaceCodeSet":
		case "PaymentStatusStateTransition":
		case "PaymentTransactionAdded":
		case "PaymentTransactionStateChanged": {
			dispatchEvent(new CustomEvent(EventTypes.Payment, { detail: msg }))
			break
		}
		case "ProductAddedToCategory":
		case "ProductCreated":
		case "ProductDeleted":
		case "ProductImageAdded":
		case "ProductPriceAdded":
		case "ProductPriceChanged":
		case "ProductPriceDiscountsSet":
		case "ProductPriceExternalDiscountSet":
		case "ProductPriceKeySet":
		case "ProductPriceModeSet":
		case "ProductPriceRemoved":
		case "ProductPricesSet":
		case "ProductPublished":
		case "ProductRemovedFromCategory":
		case "ProductRevertedStagedChanges":
		case "ProductSelectionCreated":
		case "ProductSelectionDeleted":
		case "ProductSelectionProductAdded":
		case "ProductSelectionProductExcluded":
		case "ProductSelectionProductRemoved":
		case "ProductSelectionVariantExclusionChanged":
		case "ProductSelectionVariantSelectionChanged":
		case "ProductSlugChanged":
		case "ProductStateTransition":
		case "ProductUnpublished":
		case "ProductVariantAdded":
		case "ProductVariantDeleted": {
			dispatchEvent(new CustomEvent(EventTypes.Product, { detail: msg }))
			break
		}
		case "QuoteCreated":
		case "QuoteCustomerChanged":
		case "QuoteDeleted":
		case "QuoteRenegotiationRequested":
		case "QuoteRequestCreated":
		case "QuoteRequestCustomerChanged":
		case "QuoteRequestDeleted":
		case "QuoteRequestStateChanged":
		case "QuoteRequestStateTransition":
		case "QuoteStateChanged":
		case "QuoteStateTransition": {
			dispatchEvent(new CustomEvent(EventTypes.Quote, { detail: msg }))
			break
		}
		case "ReviewCreated":
		case "ReviewRatingSet":
		case "ReviewStateTransition": {
			dispatchEvent(new CustomEvent(EventTypes.Review, { detail: msg }))
			break
		}
		case "StagedQuoteCreated":
		case "StagedQuoteDeleted":
		case "StagedQuoteSellerCommentSet":
		case "StagedQuoteStateChanged":
		case "StagedQuoteStateTransition":
		case "StagedQuoteValidToSet": {
			dispatchEvent(new CustomEvent(EventTypes.StagedQuote, { detail: msg }))
			break
		}
		case "StandalonePriceActiveChanged":
		case "StandalonePriceCreated":
		case "StandalonePriceDeleted":
		case "StandalonePriceDiscountSet":
		case "StandalonePriceExternalDiscountSet":
		case "StandalonePriceKeySet":
		case "StandalonePriceStagedChangesApplied":
		case "StandalonePriceStagedChangesRemoved":
		case "StandalonePriceTierAdded":
		case "StandalonePriceTierRemoved":
		case "StandalonePriceTiersSet":
		case "StandalonePriceValidFromAndUntilSet":
		case "StandalonePriceValidFromSet":
		case "StandalonePriceValidUntilSet":
		case "StandalonePriceValueChanged": {
			dispatchEvent(
				new CustomEvent(EventTypes.StandalonePrice, { detail: msg }),
			)
			break
		}
		case "StoreCountriesChanged":
		case "StoreCreated":
		case "StoreDeleted":
		case "StoreDistributionChannelsChanged":
		case "StoreLanguagesChanged":
		case "StoreNameSet":
		case "StoreProductSelectionsChanged":
		case "StoreSupplyChannelsChanged": {
			dispatchEvent(new CustomEvent(EventTypes.Store, { detail: msg }))
			break
		}
	}
	//dispatchEvent(new CustomEvent(EventTypes.All, { detail: msg }))
	//dispatchEvent(new CustomEvent(msg.type, { detail: msg }))
}
