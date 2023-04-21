using System;
using System.ComponentModel.DataAnnotations;

namespace LMS.LibraryItems
{
    public class CreateUpdateMagazineDto : CreateUpdateLibraryItemDto
    {
        [Required]
        [StringLength(128)]
        public string Issn { get; set; }

        [Required]
        [Range(1,30)]
        public int IssueNumber { get; set; }
    }
}
