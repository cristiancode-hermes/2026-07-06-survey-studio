import { Component, signal, OnInit, inject } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';

export interface Survey {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  data: T;
  meta?: { total: number; page: number; pageSize: number };
}

@Component({
  selector: 'app-survey-list',
  standalone: true,
  imports: [NgIf, NgFor],
  template: `
<div class="max-w-4xl mx-auto px-4 py-8">
<div class="flex items-center justify-between mb-6">
<h1 class="heading-1 text-[var(--text-primary)]">Surveys</h1>
</div>

<!-- Loading state -->
@if (loading()) {
<div class="space-y-4">
@for (item of [1, 2, 3]; track item) {
<div class="rounded-btn border border-[var(--border-color)] p-4 skeleton-pulse">
<div class="h-5 bg-accent-medium rounded w-48 mb-2"></div>
<div class="h-4 bg-accent-medium rounded w-full"></div>
</div>
}
</div>
}

<!-- Error state -->
@if (error(); as err) {
<div class="rounded-btn bg-red-50 border border-danger-200 p-4 text-red-700">
<p class="font-medium">Error loading surveys</p>
<p class="text-sm mt-1">{{ err }}</p>
</div>
}

<!-- Empty state -->
@if (!loading() && !error() && empty()) {
<div class="text-center py-16">
<p class="text-[var(--text-secondary)] text-lg">No surveys found</p>
<p class="text-[var(--text-secondary)] text-sm mt-2">
Create your first survey to get started.
</p>
</div>
}

<!-- Data state -->
@if (!loading() && !error() && !empty()) {
<div class="space-y-4">
@for (survey of surveys(); track survey.id) {
<div class="rounded-btn border border-[var(--border-color)] bg-[var(--bg-primary)] p-4 ">
<h3 class="font-semibold text-[var(--text-primary)]">{{ survey.title }}</h3>
<p class="text-sm text-[var(--text-secondary)] mt-1">{{ survey.description }}</p>
</div>
}
</div>
}
</div>
`,
})
export class SurveyListComponent implements OnInit {
  private readonly http = inject(HttpClient);
  readonly surveys = signal<Survey[]>([]);
  readonly loading = signal(true);
  readonly empty = signal(false);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.http.get<ApiResponse<Survey[]>>('/api/surveys').subscribe({
      next: (res) => {
        const data = res.data ?? res as unknown as Survey[];
        const list = Array.isArray(data) ? data : [];
        this.surveys.set(list);
        this.loading.set(false);
        this.empty.set(list.length === 0);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.message ?? 'Failed to load surveys');
      },
    });
  }
}
