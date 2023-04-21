using System;
using System.ComponentModel.DataAnnotations;

namespace LMS.LibraryItems
{
    public class CreateUpdateBookDto : CreateUpdateLibraryItemDto
    {
        [Required]
        [StringLength(128)]
        public string Author { get; set; }

        [Required]
        [Range(1,1500)]
        public int Pages { get; set; }
    }
}