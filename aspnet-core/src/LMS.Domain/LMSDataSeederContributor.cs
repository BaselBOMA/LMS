using System;
using System.Threading.Tasks;
using LMS.LibraryItems;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;

namespace LMS;

public class LMSDataSeederContributor
    : IDataSeedContributor, ITransientDependency
{
    private readonly IRepository<LibraryItem, Guid> _libraryItemRepository;

    public LMSDataSeederContributor(IRepository<LibraryItem, Guid> libraryItemRepository)
    {
        _libraryItemRepository = libraryItemRepository;
    }

    public async Task SeedAsync(DataSeedContext context)
    {
        if (await _libraryItemRepository.GetCountAsync() <= 0)
        {
            await _libraryItemRepository.InsertAsync(
                new LibraryItem
                {
                    Title = "1984",
                    Type = LibraryItemType.Book,
                    PublicationDate = new DateTime(1949, 6, 8),
                    Publisher = "",
                    Availability = LibraryItemAvailability.Available
                },
                autoSave: true
            );

            await _libraryItemRepository.InsertAsync(
                new LibraryItem
                {
                    Title = "Man of the Year—Fighting Man",
                    Type = LibraryItemType.Magazine,
                    PublicationDate = new DateTime(1951, 1, 1),
                    Publisher = "Time",
                    Availability = LibraryItemAvailability.Reserved
                },
                autoSave: true
            );

            await _libraryItemRepository.InsertAsync(
                new LibraryItem
                {
                    Title = "Man of the Year—Fighting Man",
                    Type = LibraryItemType.Magazine,
                    PublicationDate = new DateTime(1951, 1, 1),
                    Publisher = "Time",
                    Availability = LibraryItemAvailability.CheckedOut
                },
                autoSave: true
            );

            await _libraryItemRepository.InsertAsync(
                new LibraryItem
                {
                    Title = "The Dark Knight",
                    Type = LibraryItemType.Dvd,
                    PublicationDate = new DateTime(2008, 12, 9),
                    Publisher = "Warner Bros. Pictures",
                    Availability = LibraryItemAvailability.NotAvailable
                },
                autoSave: true
            );
        }
    }
}
