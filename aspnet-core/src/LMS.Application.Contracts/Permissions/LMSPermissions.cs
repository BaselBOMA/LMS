namespace LMS.Permissions;

public static class LMSPermissions
{
    public const string GroupName = "LMS";

    public static class LibraryItems
    {
        public const string Default = GroupName + ".LibraryItems";
        public const string Create = Default + ".Create";
        public const string Edit = Default + ".Edit";
        public const string Delete = Default + ".Delete";
    }
}
