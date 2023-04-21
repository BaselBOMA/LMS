using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace LMS.Data;

/* This is used if database provider does't define
 * ILMSDbSchemaMigrator implementation.
 */
public class NullLMSDbSchemaMigrator : ILMSDbSchemaMigrator, ITransientDependency
{
    public Task MigrateAsync()
    {
        return Task.CompletedTask;
    }
}
