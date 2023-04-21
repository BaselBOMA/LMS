using System.Threading.Tasks;

namespace LMS.Data;

public interface ILMSDbSchemaMigrator
{
    Task MigrateAsync();
}
