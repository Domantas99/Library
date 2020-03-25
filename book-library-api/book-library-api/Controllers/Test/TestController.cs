using BookLibrary.DTO.Test;
using BookLibrary.Services.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace BookLibrary.Api.Controllers.Test
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        ITestService testService;

        public TestController(ITestService testService)
        {
            this.testService = testService;
        }

        [HttpGet]
        public ActionResult<TestDto> Get()
        {
            return testService.GetTest();
        }
    }
}