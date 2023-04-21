using LMS.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace LMS.Controllers;

/* Inherit your controllers from this class.
 */
public abstract class LMSController : AbpControllerBase
{
    protected LMSController()
    {
        LocalizationResource = typeof(LMSResource);
    }
}
