using System;
using Volo.Abp.Application.Dtos;

namespace LMS.LibraryItems;

public class LibraryItemDto : AuditedEntityDto<Guid>
{
    public string Title { get; set; }

    public LibraryItemType Type { get; set; }

    public DateTime PublicationDate { get; set; }

    public string Publisher { get; set; }
    public LibraryItemAvailability Availability { get; set; }
}
