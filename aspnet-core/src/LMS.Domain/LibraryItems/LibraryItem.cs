using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace LMS.LibraryItems;

public class LibraryItem : AuditedAggregateRoot<Guid>
{
    public string Title { get; set; }

    public LibraryItemType Type { get; set; }

    public DateTime PublicationDate { get; set; }

    public string Publisher { get; set; }

    public LibraryItemAvailability Availability { get; set; }

    public string Notes { get; set; }
}
