# OpenCode Plugin Event Hooks

## Overview

OpenCode provides **25+ lifecycle event hooks** that plugins can subscribe to for interception, logging, and modification of OpenCode's behavior.

---

## Event Categories

| Category | Events | Purpose |
|----------|---------|----------|
| **Tools** | `tool.execute.before`, `tool.execute.after` | Intercept tool calls |
| **Commands** | `command.executed` | Log/modify commands |
| **Files** | `file.edited`, `file.watcher.updated` | Track file changes |
| **Messages** | `message.updated`, `message.part.updated`, `message.removed` | Monitor AI messages |
| **Session** | `session.created`, `session.idle`, `session.error`, `session.status`, `session.compacted` | Session lifecycle |
| **TUI** | `tui.toast.show`, `tui.prompt.append`, `tui.command.execute` | UI interactions |

---

## Tool Events

### tool.execute.before

**Fires**: Before a tool is executed

**Use Cases**:
- Validate tool arguments
- Prevent dangerous operations
- Log all tool calls
- Modify arguments before execution

**Event Data**:
```typescript
{
  toolName: string;        // Tool being executed
  args: object;            // Tool arguments
  timestamp: string;       // ISO 8601
  sessionId: string;        // Session ID
}
```

**Example**:
```typescript
'tool.execute.before': async ({ event }) => {
  const { toolName, args } = event.data;
  
  if (toolName === 'delete' && args.filePath.includes('system')) {
    console.warn('Blocking dangerous delete operation');
    // Can throw to prevent execution
    throw new Error('Protected file system path');
  }
  
  console.log(`Tool ${toolName} about to execute with args:`, args);
}
```

### tool.execute.after

**Fires**: After a tool has completed execution

**Use Cases**:
- Log tool results
- Collect usage statistics
- Implement post-execution validation
- Trigger automated workflows

**Event Data**:
```typescript
{
  toolName: string;        // Tool that was executed
  args: object;            // Tool arguments
  result: any;            // Tool result
  timestamp: string;       // ISO 8601
  sessionId: string;        // Session ID
}
```

**Example**:
```typescript
'tool.execute.after': async ({ event }) => {
  const { toolName, result } = event.data;
  
  if (result?.error) {
    console.error(`Tool ${toolName} failed:`, result.error);
    // Send alert or implement retry logic
  } else {
    console.log(`Tool ${toolName} succeeded`);
    // Track successful operations
  }
}
```

---

## Command Events

### command.executed

**Fires**: When a command is executed (slash command or plugin command)

**Use Cases**:
- Audit logging of all commands
- Modify command behavior
- Implement command rate limiting
- Track user patterns

**Event Data**:
```typescript
{
  command: string;          // Command that was executed
  args: object[];         // Command arguments
  userId: string;          // User ID
  timestamp: string;       // ISO 8601
  sessionId: string;        // Session ID
}
```

**Example**:
```typescript
'command.executed': async ({ event }) => {
  const { command, args } = event.data;
  console.log(`Command executed: ${command}`, args);
  
  // Example: Log to external system
  await logToAnalytics({ command, args, timestamp: Date.now() });
}
```

---

## File Events

### file.edited

**Fires**: When a file is edited via OpenCode tools (read, write, edit)

**Use Cases**:
- Auto-format on save
- Trigger linting
- Update file watchers
- Implement backup systems

**Event Data**:
```typescript
{
  filePath: string;        // Path to edited file
  operation: 'read' | 'write' | 'edit';
  changes?: object;         // Diff information (if available)
  timestamp: string;       // ISO 8601
  sessionId: string;        // Session ID
}
```

**Example**:
```typescript
'file.edited': async ({ event }) => {
  const { filePath, operation } = event.data;
  
  if (operation === 'write' && filePath.endsWith('.ts')) {
    console.log(`TypeScript file written: ${filePath}`);
    
    // Auto-format
    await formatTypeScript(filePath);
    
    // Trigger linter
    await lintFile(filePath);
  }
}
```

### file.watcher.updated

**Fires**: When file watcher detects external changes

**Use Cases**:
- Reload configurations
- Trigger hot-reload
- Sync with external systems
- Implement watch mode

**Event Data**:
```typescript
{
  filePath: string;        // Path that changed
  eventType: 'create' | 'update' | 'delete';
  timestamp: string;       // ISO 8601
}
```

**Example**:
```typescript
'file.watcher.updated': async ({ event }) => {
  const { filePath, eventType } = event.data;
  console.log(`File ${eventType}: ${filePath}`);
  
  if (filePath.includes('config.json')) {
    // Reload configuration
    await reloadConfig();
  }
}
```

---

## Message Events (Read-Only)

### message.updated

**Fires**: When session message is updated

**Important**: Message events are **read-only** - you cannot modify message content retroactively.

**Use Cases**:
- Monitor AI responses
- Track conversation flow
- Implement message analytics
- Log key interactions

**Event Data**:
```typescript
{
  messageId: string;        // Message ID
  role: 'user' | 'assistant' | 'system';
  content: string;          // Message content (read-only)
  timestamp: string;       // ISO 8601
  sessionId: string;        // Session ID
}
```

**Example**:
```typescript
'message.updated': async ({ event }) => {
  const { role, content } = event.data;
  console.log(`Message from ${role}: ${content.substring(0, 50)}...`);
  
  // Log for analytics
  await logMessage({ role, length: content.length, timestamp: Date.now() });
}
```

### message.part.updated

**Fires**: When individual message parts are updated

**Use Cases**:
- Track tool call results
- Monitor partial responses
- Implement streaming analytics

**Event Data**:
```typescript
{
  messageId: string;        // Parent message ID
  partId: string;          // Part ID
  type: 'text' | 'tool' | 'image';
  content: any;             // Part content
  timestamp: string;       // ISO 8601
}
```

### message.removed

**Fires**: When a message is removed from the session

**Use Cases**:
- Track message deletions
- Implement undo/redo logging
- Cleanup related data

**Event Data**:
```typescript
{
  messageId: string;        // Removed message ID
  reason: string;          // Removal reason
  timestamp: string;       // ISO 8601
}
```

---

## Session Events

### session.created

**Fires**: When a new session is created

**Use Cases**:
- Initialize plugin state
- Load session-specific data
- Setup logging for new session
- Trigger session initialization workflows

**Event Data**:
```typescript
{
  sessionId: string;        // Session ID
  timestamp: string;       // ISO 8601
  userId: string;          // User ID
  projectRoot: string;      // Project root path
}
```

**Example**:
```typescript
'session.created': async ({ event }) => {
  const { sessionId, projectRoot } = event.data;
  console.log(`New session created: ${sessionId}`);
  
  // Initialize plugin state
  await initializeSessionState(sessionId);
  
  // Load project configuration
  await loadProjectConfig(projectRoot);
}
```

### session.idle

**Fires**: When session becomes idle (user inactive or completed)

**Use Cases**:
- Cleanup resources
- Save session data
- Flush logs
- Trigger session completion workflows

**Event Data**:
```typescript
{
  sessionId: string;        // Session ID
  idleDuration: number;     // Duration in seconds
  timestamp: string;       // ISO 8601
}
```

**Example**:
```typescript
'session.idle': async ({ event }) => {
  const { sessionId, idleDuration } = event.data;
  console.log(`Session ${sessionId} idle after ${idleDuration}s`);
  
  // Save session data
  await saveSessionData(sessionId);
  
  // Flush logs
  await flushLogs(sessionId);
  
  // Cleanup resources
  cleanupSessionResources(sessionId);
}
```

### session.error

**Fires**: When an error occurs in the session

**Use Cases**:
- Log errors for debugging
- Implement error recovery
- Send error notifications
- Track error rates

**Event Data**:
```typescript
{
  sessionId: string;        // Session ID
  error: {
    message: string;       // Error message
    code?: string;         // Error code
    stack?: string;        // Stack trace
  };
  timestamp: string;       // ISO 8601
}
```

**Example**:
```typescript
'session.error': async ({ event }) => {
  const { sessionId, error } = event.data;
  console.error(`Session ${sessionId} error:`, error);
  
  // Log error to external system
  await logError({ sessionId, error: error.message });
  
  // Attempt recovery
  await attemptRecovery(sessionId, error);
}
```

### session.status

**Fires**: When session status changes

**Use Cases**:
- Track session lifecycle
- Implement status-based behavior
- Monitor session health

**Event Data**:
```typescript
{
  sessionId: string;        // Session ID
  status: string;          // Status (active, idle, completed, etc.)
  timestamp: string;       // ISO 8601
}
```

### session.compacted

**Fires**: When session is compacted (context summarization)

**Use Cases**:
- Track context usage
- Implement custom compaction logic
- Monitor memory usage

**Event Data**:
```typescript
{
  sessionId: string;        // Session ID
  compacted: boolean;     // Whether context was compacted
  beforeSize: number;      // Tokens before compaction
  afterSize: number;       // Tokens after compaction
  timestamp: string;       // ISO 8601
}
```

---

## TUI Events

### tui.toast.show

**Fires**: When a toast notification is shown

**Use Cases**:
- Log notifications
- Track UI events
- Implement custom notification routing

**Event Data**:
```typescript
{
  message: string;          // Toast message
  type: 'info' | 'success' | 'warning' | 'error';
  duration: number;         // Display duration (ms)
}
```

**Example**:
```typescript
'tui.toast.show': async ({ event }) => {
  const { message, type } = event.data;
  console.log(`Toast shown: ${type} - ${message}`);
  
  // Log to external system
  await logNotification({ type, message, timestamp: Date.now() });
}
```

### tui.prompt.append

**Fires**: When text is appended to the prompt

**Use Cases**:
- Track user input
- Implement input validation
- Custom prompt behavior

**Event Data**:
```typescript
{
  text: string;             // Appended text
  timestamp: string;       // ISO 8601
}
```

### tui.command.execute

**Fires**: When a command is executed from the TUI

**Use Cases**:
- Track command execution
- Implement command interception
- Add custom command logic

**Event Data**:
```typescript
{
  command: string;          // Command that was executed
  args: object[];         // Command arguments
  source: 'user' | 'plugin';
}
```

---

## Event Subscription Pattern

### Subscribe to Events

```typescript
export default async function myPlugin(context: Context) {
  return {
    // Subscribe to specific events
    'tool.execute.before': async ({ event }) => {
      // Handle event
    },
    
    'command.executed': async ({ event }) => {
      // Handle event
    }
  };
}
```

### Subscribe to All Events

```typescript
export default async function myPlugin(context: Context) {
  return {
    // Subscribe to all events
    '*': async ({ event }) => {
      console.log(`Event: ${event.name}`, event.data);
    }
  };
}
```

---

## Best Practices

### 1. Event Handler Performance
- Keep handlers lightweight
- Avoid heavy computations
- Use async/await properly
- Don't block OpenCode execution

### 2. Error Handling
- Always wrap handlers in try/catch
- Log errors appropriately
- Provide graceful degradation
- Don't crash the plugin

### 3. Event Throttling
- Throttle frequent events (file.edited)
- Debounce rapid events
- Implement rate limiting

### 4. Event Data Validation
- Validate event.data structure
- Handle missing fields
- Provide default values

### 5. Memory Management
- Cleanup in session.idle
- Avoid memory leaks
- Limit event history

---

## Common Patterns

### Command Logging
```typescript
'command.executed': async ({ event }) => {
  const { command, args } = event.data;
  console.log(`[${new Date().toISOString()}] Command: ${command}`, args);
}
```

### Tool Validation
```typescript
'tool.execute.before': async ({ event }) => {
  const { toolName, args } = event.data;
  
  if (toolName === 'delete' && args.filePath.includes('dangerous')) {
    throw new Error('Protected path');
  }
}
```

### File Auto-Format
```typescript
'file.edited': async ({ event }) => {
  const { filePath, operation } = event.data;
  
  if (operation === 'write' && filePath.endsWith('.ts')) {
    await formatFile(filePath);
  }
}
```

### Session Cleanup
```typescript
'session.idle': async ({ event }) => {
  const { sessionId } = event.data;
  
  await saveSession(sessionId);
  await cleanupResources(sessionId);
}
```

---

## Event Hook Mapping to Claude Code

| Claude Code Hook | OpenCode Plugin Event |
|-----------------|----------------------|
| `PreToolUse` | `tool.execute.before` |
| `PostToolUse` | `tool.execute.after` |
| `UserPromptSubmit` | `message.updated`, `tui.prompt.append` |
| `SessionEnd` | `session.idle` |

---

## Further Reading

- **PLUGIN_ARCHITECTURE.md** - Plugin structure and SDK
- **PLUGIN_SDK_REFERENCE.md** - Full API reference
- **PLUGIN_BEST_PRACTICES.md** - Development guidelines

---

## Troubleshooting

### Events Not Firing
- Verify event name spelling
- Check console for errors
- Ensure plugin is loaded
- Restart OpenCode

### Event Data Missing
- Check OpenCode version
- Review event documentation
- Log event.data structure
- Report issues

### Performance Issues
- Add event throttling
- Optimize handler logic
- Use async operations
- Implement debouncing

---

## Summary

OpenCode provides 25+ event hooks for plugins to:

- ✅ Intercept tool executions
- ✅ Track file changes
- ✅ Monitor AI messages
- ✅ Manage session lifecycle
- ✅ Extend UI behavior
- ✅ Log all operations

**Use events wisely** to build powerful plugins without breaking OpenCode's functionality!

---

Happy event handling! 🔗
