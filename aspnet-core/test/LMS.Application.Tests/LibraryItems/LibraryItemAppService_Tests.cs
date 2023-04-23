using System;
using System.Linq;
using System.Threading.Tasks;
using Shouldly;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Validation;
using Xunit;

namespace LMS.LibraryItems;


public class LibraryItemAppService_Tests : LMSApplicationTestBase
{
    private readonly ILibraryItemAppService _libraryItemAppService;

    public LibraryItemAppService_Tests()
    {
        _libraryItemAppService = GetRequiredService<ILibraryItemAppService>();
    }

    [Fact]
    public async Task Should_Get_List_Of_Books()
    {
        //Act
        var result = await _libraryItemAppService.GetListAsync(
            new PagedAndSortedResultRequestDto()
        );

        //Assert
        result.TotalCount.ShouldBeGreaterThan(0);
        result.Items.ShouldContain(b => b.Title == "1984");
    }

    [Fact]
    public async Task Should_Create_A_Valid_Book()
    {
        //Act
        var result = await _libraryItemAppService.CreateAsync(
            new CreateUpdateLibraryItemDto
            {
                Title = "New test book 42",
                Publisher = "Penguin Classics",
                PublicationDate = DateTime.Now,
                Type = LibraryItemType.Book
            }
        );

        //Assert
        result.Id.ShouldNotBe(Guid.Empty);
        result.Title.ShouldBe("New test book 42");
    }

    [Fact]
    public async Task Should_Not_Create_A_Book_Without_Name()
    {
        var exception = await Assert.ThrowsAsync<AbpValidationException>(async () =>
        {
            await _libraryItemAppService.CreateAsync(
                new CreateUpdateLibraryItemDto
                {
                    Title = "",
                    Publisher = "Penguin Classics",
                    PublicationDate = DateTime.Now,
                    Type = LibraryItemType.Book
                }
            );
        });

        exception.ValidationErrors
            .ShouldContain(err => err.MemberNames.Any(mem => mem == "Title"));
    }
}
