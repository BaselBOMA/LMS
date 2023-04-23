using LMS.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace LMS.Permissions;

public class LMSPermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var libraryItemGroup = context.AddGroup(LMSPermissions.GroupName, L("Permission:LMS"));

        var libraryItemsPermission = libraryItemGroup.AddPermission(LMSPermissions.LibraryItems.Default, L("Permission:LibraryItems"));
        libraryItemsPermission.AddChild(LMSPermissions.LibraryItems.Create, L("Permission:LibraryItems.Create"));
        libraryItemsPermission.AddChild(LMSPermissions.LibraryItems.Edit, L("Permission:LibraryItems.Edit"));
        libraryItemsPermission.AddChild(LMSPermissions.LibraryItems.Delete, L("Permission:LibraryItems.Delete"));
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<LMSResource>(name);
    }
}
