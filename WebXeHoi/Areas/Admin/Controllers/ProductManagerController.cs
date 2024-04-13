using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using WebXeHoi.Models;
using WebXeHoi.Repositories;

namespace WebXeHoi.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Authorize]
    public class ProductManagerController : Controller
    {
        private readonly IProductRepository _productRepository;
        private readonly ICategoryRepository _categoryRepository;

        public ProductManagerController(IProductRepository productRepository, ICategoryRepository categoryRepository)
        {
            _productRepository = productRepository;
            _categoryRepository = categoryRepository;
        }

        // Hiển thị danh sách sản phẩm
        public async Task<IActionResult> Index()
        {
            var products = await _productRepository.GetAllAsync();
            return View(products);
        }

        public async Task<IActionResult> Create()
        {
            var categories = await _categoryRepository.GetAllAsync();
            ViewBag.Categories = new SelectList(categories, "Id", "Name");
            return View();
        }
        private async Task<string> SaveImage(IFormFile ImageUrl)
        {
            var savePath = Path.Combine("wwwroot/images", ImageUrl.FileName); // Thay đổi đường dẫn theo cấu hình của bạn
            using (var fileStream = new FileStream(savePath, FileMode.Create))
            {
                await ImageUrl.CopyToAsync(fileStream);
            }
            return "/images/" + ImageUrl.FileName; // Trả về đường dẫn tương đối
        }
    }
}
