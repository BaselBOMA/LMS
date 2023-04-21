using System;
using System.ComponentModel.DataAnnotations;

namespace LMS.LibraryItems
{
    public class CreateUpdateDvdDto : CreateUpdateLibraryItemDto
    {
        [Required]
        [StringLength(128)]
        public string Language { get; set; }

        [Required]
        [Range(1, 300)]
        public int Duration { get; set; }
    }
}
