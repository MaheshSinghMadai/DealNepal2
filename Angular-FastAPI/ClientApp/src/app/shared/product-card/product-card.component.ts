import { Component, Input } from '@angular/core';
import { Product } from '../../core/models/product.model';
import { CATEGORY_GRAPHICS_COLLECTION } from '../../core/assets/graphics-suite';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;

  getCategoryImage(category: string): string {
    if (!category) {
      return 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80';
    }
    const catLower = category.toLowerCase();
    const found = CATEGORY_GRAPHICS_COLLECTION.find(
      item => item.category.toLowerCase() === catLower || catLower.includes(item.category.toLowerCase()) || item.category.toLowerCase().includes(catLower)
    );
    return found ? found.url : 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80';
  }
}
