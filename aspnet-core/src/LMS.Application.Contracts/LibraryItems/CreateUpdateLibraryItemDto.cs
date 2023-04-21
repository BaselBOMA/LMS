using System;
using System.ComponentModel.DataAnnotations;

namespace LMS.LibraryItems;

public class CreateUpdateLibraryItemDto
{
    [Required]
    [StringLength(128)]
    public string Title { get; set; }

    [Required]
    public LibraryItemType Type { get; set; }

    [Required]
    [DataType(DataType.Date)]
    public DateTime PublicationDate { get; set; } = DateTime.Now;

    [Required]
    [StringLength(128)]
    public string Publisher { get; set; }
}
