using LMS.LibraryItems;

namespace LMS.Dvds;

public class DvdDto : LibraryItemDto
{
    public string Language { get; set; }
    public int Duration { get; set; }
}
