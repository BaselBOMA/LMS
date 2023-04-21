using LMS.LibraryItems;

namespace LMS.Magazines;

public class MagazineDto : LibraryItemDto
{
    public string Issn { get; set; }
    public int IssueNumber { get; set; }
}
