# Testing Guide

This document explains the comprehensive testing strategy implemented for the Distributed Task Queue Visualization System frontend.

## Overview

The testing strategy covers multiple layers:

- **Unit Tests**: Pure functions and custom hooks
- **Component Tests**: React components with React Testing Library
- **Integration Tests**: Full user flows with mocked APIs (MSW)
- **E2E Tests**: Critical user workflows with Playwright

## Test Structure

```
frontend/
├── src/
│   ├── lib/
│   │   ├── timeUtils.test.ts          # Unit tests for time utilities
│   │   └── taskUtils.test.ts          # Unit tests for task utilities
│   ├── hooks/
│   │   └── useTaskSubmission.test.ts  # Unit tests for custom hooks
│   ├── components/
│   │   ├── TaskCard.test.tsx          # Component tests
│   │   ├── TaskSubmissionForm.test.tsx
│   │   └── WorkerManagementPanel.test.tsx
│   └── test/
│       ├── setup.ts                   # Test configuration
│       ├── mocks/
│       │   ├── handlers.ts            # MSW API handlers
│       │   └── server.ts              # MSW server setup
│       ├── utils/
│       │   └── test-utils.tsx         # Custom render with providers
│       └── integration/
│           └── task-flow.integration.test.tsx
└── e2e/
    ├── task-lifecycle.spec.ts         # E2E: Task creation & tracking
    ├── worker-management.spec.ts      # E2E: Worker scaling
    └── engine-controls.spec.ts        # E2E: Engine state management
```

## Running Tests

### Unit & Component Tests (Vitest)

```bash
# Run tests in watch mode (interactive)
npm test

# Run tests once
npm run test:run

# Run with UI
npm run test:ui

# Run with coverage report
npm run test:coverage
```

### E2E Tests (Playwright)

**Important:** The backend API must be running on `http://localhost:3000` before running E2E tests.

```bash
# Run E2E tests (requires backend running)
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run E2E tests in headed mode (see browser)
npm run test:e2e:headed
```

### All Tests

```bash
# Run all unit, component, integration, and E2E tests
npm run test:all
```
