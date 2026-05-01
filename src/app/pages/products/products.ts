import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [NgOptimizedImage],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {}
