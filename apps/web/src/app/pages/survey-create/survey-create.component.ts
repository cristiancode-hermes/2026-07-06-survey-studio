import { Component, signal } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-survey-create',
  standalone: true,
  imports: [NgIf],
  template: `
<div class="max-w-2xl mx-auto px-4 py-8">
<h1 class="heading-1 text-[var(--text-primary)] mb-6">Create Survey</h1>

<!-- Error state -->
@if (error(); as err) {
<div class="rounded-btn bg-red-50 border border-danger-200 p-4 text-red-700 mb-6">
<p class="font-medium">Error</p>
<p class="text-sm mt-1">{{ err }}</p>
</div>
}

<!-- Form placeholder -->
<div class="rounded-btn border border-[var(--border-color)] bg-[var(--bg-primary)] p-6 ">
<p class="text-[var(--text-secondary)]">
Survey creation form will be implemented here.
</p>

@if (loading()) {
<div class="mt-4 flex items-center gap-2 text-sm text-[var(--text-secondary)]">
<span>Saving...</span>
</div>
}
</div>
</div>
`,
})
export class SurveyCreateComponent {
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
}
