using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using WebXeHoi.Models;
using WebXeHoi.Repositories;

namespace WebXeHoi.Controllers
{
    public class HomeController : Controller
    {

        private readonly IProductRepository _productReposity;

        public HomeController(IProductRepository productRepository)
        {
            _productReposity = productRepository;
        }

        //Hiển thị danh sách sản phẩm
        public async Task<IActionResult> Index()
        {
            var product = await _productReposity.GetAllAsync();
            return View(product);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
