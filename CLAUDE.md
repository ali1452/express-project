# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

```bash
# Start the server (runs on port from .env or default 5000)
npm start

# The entry point is index.js (NOT server.js despite package.json)
node index.js
```

## Project Architecture

This is an Express.js REST API with MongoDB/Mongoose using a **modular MVC pattern**.

### Directory Structure

**Critical naming convention**: This project uses `modals/` (not `models/`) for Mongoose schemas.

```
express-project/
├── index.js              # Entry point - mounts all routes and starts server
├── config/
│   └── dbConnection.js   # MongoDB connection logic
├── modals/               # Mongoose schemas (NOTE: "modals" not "models")
│   ├── userModal.js
│   ├── productsModal.js
│   ├── orderModal.js
│   └── favoriteModal.js
├── controller/           # Request handlers wrapped with express-async-handler
│   ├── userController.js
│   ├── productController.js
│   ├── orderController.js
│   └── favoriteController.js
├── router/               # Express Router instances
│   ├── router.js         # User routes
│   ├── productRouter.js
│   ├── orderRouter.js
│   └── favoriteRouter.js
└── middleware/
    └── authMiddleware.js # JWT authentication
```

### Route Mounting Pattern

Routes are mounted in `index.js` with prefixes:
- `/user` → user CRUD and authentication
- `/products` → product listing
- `/orders` → order management
- `/favorites` → user favorites (requires authentication)

### Database Architecture

**MongoDB Connection**: Connection string is in `config/dbConnection.js` (also duplicated in .env as CONNECTION_STRING, but dbConnection.js has it hardcoded).

**Schema Conventions**:
- Use `require: [true, "message"]` for validation (not `required`)
- All schemas include `timeStamps: true` in options
- Model exports use lowercase collection names: `mongoose.model('user', userSchema)`
- Products use custom `product_id` field alongside MongoDB `_id`

**Key Models**:
- **User**: Authentication with bcrypt password hashing, pre-save hook for password encryption, `comparePassword` method
- **Products**: Full e-commerce product schema with `product_id`, SKUs, pricing, `is_favourite` flag
- **Order**: Nested shopping address, items array, payment mode enum
- **Favorite**: User-product relationship with unique compound index on `(user, product_id)`

### Authentication Pattern

JWT-based authentication using `authMiddleware.js`:
- Token verification via `Authorization: Bearer <token>` header
- JWT secret from `process.env.JWT_SECRET` or defaults to `'express-learning-secret'`
- Tokens expire in 1 hour
- Middleware attaches `req.user` with password field excluded
- Used by favorite routes via `route.use(authMiddleware)`

### Controller Pattern

All async operations use `express-async-handler` wrapper:

```javascript
const asyncHandler = require('express-async-handler')
const getUser = asyncHandler(async (req, res, next) => {
  // async logic
})
```

**Response Format**: Controllers return JSON with `{ success: boolean, data/message: ... }`

### Router Pattern

Routers pass req/res explicitly to controller functions:

```javascript
route.get('/', (req,res) => getUser(req,res))  // explicit parameter passing
```

Use PATCH for updates, not PUT.

## Adding New Features

Follow the modular pattern:
1. Create Mongoose schema in `modals/` (e.g., `modals/newResourceModal.js`)
2. Create controller in `controller/` (e.g., `controller/newResourceController.js`)
3. Create router in `router/` (e.g., `router/newResourceRouter.js`)
4. Mount router in `index.js`: `app.use('/resource', newResourceRouter)`

## Deployment

Configured for Vercel deployment with `vercel.json` catch-all routing to `index.js`.

## Environment Variables

Check `.env` for:
- `PORT`: Server port (defaults to 5000)
- `CONNECTION_STRING`: MongoDB connection (though dbConnection.js has it hardcoded)
- `JWT_SECRET`: JWT signing secret (defaults to 'express-learning-secret')

## AI Agent Framework

This project includes BMad-Method AI agent configurations for structured development workflows:

**Agent Directories**:
- `agents/` - Web-compatible bundled agent definitions
- `.clinerules/` - CLI-specific agent rules (mirrored from `.bmad-core/`)

**Available Agent Personas**:
- `dev.txt` (James) - Full Stack Developer for implementation, debugging, testing
- `architect.txt` - System architecture and design decisions
- `analyst.txt` - Requirements analysis
- `qa.txt` - Quality assurance and testing
- `pm.txt` - Project management
- `po.txt` - Product owner
- `sm.txt` - Scrum master
- `ux-expert.txt` - UX/UI expertise
- `bmad-master.txt` - Master orchestration
- `bmad-orchestrator.txt` - Workflow orchestration

These agents follow specific personas, commands, and workflows defined in YAML format. The developer agent (dev.txt) is particularly relevant for code implementation tasks with built-in story validation, testing checklists, and quality gates.

Copilot-specific instructions are in `.github/copilot-instructions.md` which documents the MVC pattern, known issues, and development workflow conventions.

## Dependencies

- **express**: ^4.21.2 - Web framework
- **mongoose**: ^7.2.2 - MongoDB ODM
- **bcryptjs**: ^3.0.3 - Password hashing
- **jsonwebtoken**: ^9.0.2 - JWT authentication
- **express-async-handler**: ^1.2.0 - Async error handling
- **cors**: ^2.8.5 - CORS middleware
- **dotenv**: ^16.0.3 - Environment variables
- **nodemon**: ^2.0.22 - Development auto-reload
