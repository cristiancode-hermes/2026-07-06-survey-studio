# Survey Studio — Shared Conventions & Patterns

## Naming Conventions
- **Entities**: PascalCase, singular (Survey, Question, QuestionOption)
- **DTOs**: PascalCase with verb prefix (CreateSurveyDto, UpdateSurveyDto)
- **Properties**: camelCase (`surveyId`, `questionText`)
- **Files**: kebab-case (`survey.controller.ts`, `question.service.ts`)
- **Routes**: plural kebab-case (`/api/surveys`, `/api/surveys/:id/questions`)
- **Frontend Components**: PascalCase, feature-prefixed (`SurveyListComponent`, `QuestionEditorComponent`)

## Entity Field Alignment
- `id`: string (UUID)
- `createdAt`: string (ISO datetime)
- `updatedAt`: string (ISO datetime)
- Organization scoping: always `organizationId` in query filters
- Soft deletes: use `isActive` boolean flag instead of hard delete

## API Response Shape
```typescript
interface ApiResponse<T> {
  data: T;
  meta?: { total: number; page: number; pageSize: number };
}
```

## Backend Module Pattern
```
feature/
  feature.module.ts
  feature.controller.ts
  feature.service.ts
  dto/create-feature.dto.ts
  dto/update-feature.dto.ts
```

## Frontend Component Pattern
- Standalone components only
- Signal-based: `signal()`, `computed()`, `input()`, `output()`
- Loading/empty/error signals on every data page
- `inject()` instead of constructor DI

## Auth Pattern
- JWT with multi-tenant organizationId in payload
- @CurrentUser() decorator to extract JWT info
- Survey public responses: no auth required, use shortId for access
