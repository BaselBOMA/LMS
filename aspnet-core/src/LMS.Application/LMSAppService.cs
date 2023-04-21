using System;
using System.Collections.Generic;
using System.Text;
using LMS.Localization;
using Volo.Abp.Application.Services;

namespace LMS;

/* Inherit your application services from this class.
 */
public abstract class LMSAppService : ApplicationService
{
    protected LMSAppService()
    {
        LocalizationResource = typeof(LMSResource);
    }
}
