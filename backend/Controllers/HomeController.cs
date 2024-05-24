using Microsoft.AspNetCore.Mvc;
using backend.Data;

namespace backend.Controllers {
    public class HomeController : Controller {
        // Create an Employee list and serialize it to JSON.
        public IActionResult ListEmployees() {
            var employees = new List<Employee>();
            employees.Add(new Employee() { Id = 2, ParentId = 0, Name = "Andrew Fuller", Title = "Vice President" });
            employees.Add(new Employee() { Id = 1, ParentId = 5, Name = "Nancy Davolio", Title = "Sales Representative" });
            employees.Add(new Employee() { Id = 3, ParentId = 5, Name = "Janet Leverling", Title = "Sales Representative" });
            employees.Add(new Employee() { Id = 4, ParentId = 5, Name = "Margaret Peacock", Title = "Sales Representative" });
            employees.Add(new Employee() { Id = 5, ParentId = 2, Name = "Steven Buchanan", Title = "Sales Manager" });
            return Json(employees);
        }
    }
}
