import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  filteredProducts: Product[] = [];
  searchQuery: string = '';
  selectedCategory: string = 'All';
  sortOrder: string = 'default';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategory = params['category'];
      }
      if (params['q']) {
        this.searchQuery = params['q'];
      }
      this.applyFilters();
    });
  }

  setCategory(category: string): void {
    this.selectedCategory = category;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { category: this.selectedCategory === 'All' ? null : this.selectedCategory },
      queryParamsHandling: 'merge'
    });
    this.applyFilters();
  }

  onCategoryChange(): void {
    this.setCategory(this.selectedCategory);
  }

  applyFilters(): void {
    this.productService.searchProducts(this.searchQuery, this.selectedCategory, this.sortOrder)
      .subscribe(products => {
        this.filteredProducts = products;
      });
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = 'All';
    this.sortOrder = 'default';
    this.applyFilters();
  }
}
