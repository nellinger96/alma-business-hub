import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  DollarSign,
  FileText,
  Gift,
  MessageSquareText,
  NotebookText,
  Phone,
  Plus,
  RefreshCw,
  UserRound,
  X
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { APPWRITE_BUSINESS_IDS } from '../../../lib/appwriteConfig'
import type { ClientNote, FollowUpTask } from '../../../types/workflow'
import {
  completeTask,
  createClientNote,
  createFollowUpTask,
  listClientNotes,
  listClientTasks
} from '../../../services/workflowService'

type Client = {
  id: string
  name: string
  phone: string
  service: string
  status: string
  birthday: string
}

type Props = {
  client: Client
  activeBusiness: string
  activeEmployeeName: string
  isPetra: boolean
  isDemoMode: boolean
  onClose: () => void
  onBirthdayText: (clientName: string) => void
  onPromoText: () => void
}

function getBusinessId(activeBusiness: string) {
  return activeBusiness === 'Petra Insurance'
    ? APPWRITE_BUSINESS_IDS.petra
    : APPWRITE_BUSINESS_IDS.alianza
}

function formatDueDate(value: string) {
  if (!value) return 'No due date'

  try {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date(value))
  } catch {
    return value
  }
}

export function ClientProfileModal({
  client,
  activeBusiness,
  activeEmployeeName,
  isPetra,
  isDemoMode,
  onClose,
  onBirthdayText,
  onPromoText
}: Props) {
  const [notes, setNotes] = useState<ClientNote[]>([])
  const [tasks, setTasks] = useState<FollowUpTask[]>([])
  const [noteText, setNoteText] = useState('')
  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [taskDueDate, setTaskDueDate] = useState('')
  const [taskPriority, setTaskPriority] = useState<FollowUpTask['priority']>('normal')
  const [isLoading, setIsLoading] = useState(false)
  const [isSavingNote, setIsSavingNote] = useState(false)
  const [isSavingTask, setIsSavingTask] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const businessId = getBusinessId(activeBusiness)

  const loadWorkflow = async () => {
    if (isDemoMode) {
      setNotes([
        {
          id: 'demo-note-1',
          clientId: client.id,
          businessId,
          createdBy: '',
          createdByName: activeEmployeeName,
          note: 'Called client. Waiting for missing documents.',
          createdAt: 'Demo'
        },
        {
          id: 'demo-note-2',
          clientId: client.id,
          businessId,
          createdBy: '',
          createdByName: activeEmployeeName,
          note: 'Client prefers text message follow-up.',
          createdAt: 'Demo'
        }
      ])

      setTasks([
        {
          id: 'demo-task-1',
          businessId,
          clientId: client.id,
          leadId: '',
          assignedTo: '',
          assignedToName: activeEmployeeName,
          title: 'Confirm missing document',
          description: 'Ask client to send the missing document.',
          dueDate: '',
          status: 'open',
          priority: 'normal',
          createdBy: '',
          createdByName: activeEmployeeName,
          completedAt: '',
          createdAt: 'Demo'
        }
      ])

      return
    }

    setIsLoading(true)
    setErrorMessage('')

    try {
      const [clientNotes, clientTasks] = await Promise.all([
        listClientNotes(client.id),
        listClientTasks(client.id)
      ])

      setNotes(clientNotes)
      setTasks(clientTasks)
    } catch (error) {
      console.error('Could not load client workflow:', error)
      setErrorMessage('Could not load notes or tasks. Check Appwrite permissions.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void loadWorkflow()
  }, [client.id, isDemoMode])

  const handleAddNote = async () => {
    const cleanNote = noteText.trim()
    if (!cleanNote) return

    setIsSavingNote(true)
    setErrorMessage('')

    try {
      if (isDemoMode) {
        const demoNote: ClientNote = {
          id: `demo-note-${Date.now()}`,
          clientId: client.id,
          businessId,
          createdBy: '',
          createdByName: activeEmployeeName,
          note: cleanNote,
          createdAt: 'Just now'
        }

        setNotes((current) => [demoNote, ...current])
        setNoteText('')
        return
      }

      const newNote = await createClientNote({
        clientId: client.id,
        businessId,
        createdByName: activeEmployeeName,
        note: cleanNote
      })

      setNotes((current) => [newNote, ...current])
      setNoteText('')
    } catch (error) {
      console.error('Could not save note:', error)
      setErrorMessage('Could not save note. Check Appwrite permissions.')
    } finally {
      setIsSavingNote(false)
    }
  }

  const handleAddTask = async () => {
    const cleanTitle = taskTitle.trim()
    if (!cleanTitle) return

    setIsSavingTask(true)
    setErrorMessage('')

    const dueDateIso = taskDueDate
      ? new Date(`${taskDueDate}T09:00:00`).toISOString()
      : ''

    try {
      if (isDemoMode) {
        const demoTask: FollowUpTask = {
          id: `demo-task-${Date.now()}`,
          businessId,
          clientId: client.id,
          leadId: '',
          assignedTo: '',
          assignedToName: activeEmployeeName,
          title: cleanTitle,
          description: taskDescription.trim(),
          dueDate: dueDateIso,
          status: 'open',
          priority: taskPriority,
          createdBy: '',
          createdByName: activeEmployeeName,
          completedAt: '',
          createdAt: 'Just now'
        }

        setTasks((current) => [demoTask, ...current])
        setTaskTitle('')
        setTaskDescription('')
        setTaskDueDate('')
        setTaskPriority('normal')
        return
      }

      const newTask = await createFollowUpTask({
        businessId,
        clientId: client.id,
        assignedToName: activeEmployeeName,
        title: cleanTitle,
        description: taskDescription.trim(),
        dueDate: dueDateIso,
        priority: taskPriority,
        createdByName: activeEmployeeName
      })

      setTasks((current) => [newTask, ...current])
      setTaskTitle('')
      setTaskDescription('')
      setTaskDueDate('')
      setTaskPriority('normal')
    } catch (error) {
      console.error('Could not create task:', error)
      setErrorMessage('Could not create follow-up task. Check Appwrite permissions.')
    } finally {
      setIsSavingTask(false)
    }
  }

  const handleCompleteTask = async (taskId: string) => {
    setErrorMessage('')

    try {
      if (isDemoMode) {
        setTasks((current) =>
          current.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  status: 'completed',
                  completedAt: new Date().toISOString()
                }
              : task
          )
        )

        return
      }

      const completedTask = await completeTask(taskId)

      setTasks((current) =>
        current.map((task) =>
          task.id === taskId ? completedTask : task
        )
      )
    } catch (error) {
      console.error('Could not complete task:', error)
      setErrorMessage('Could not complete task. Check Appwrite permissions.')
    }
  }

  return (
    <div className="modal-backdrop">
      <div className="client-profile-modal">
        <div className="client-profile-head">
          <div>
            <span className={isDemoMode ? 'demo-badge light' : 'real-data-chip'}>
              {isDemoMode ? 'Demo Client Profile' : 'Live Client Profile'}
            </span>
            <h2>{client.name}</h2>
            <p>{activeBusiness} • {client.service}</p>
          </div>

          <button onClick={onClose} aria-label="Close profile">
            <X size={22} />
          </button>
        </div>

        {errorMessage && (
          <div className="auth-error" style={{ marginBottom: 16 }}>
            {errorMessage}
          </div>
        )}

        <div className="client-profile-grid">
          <div className="client-info-card">
            <UserRound />
            <span>Client ID</span>
            <strong>{client.id}</strong>
          </div>

          <div className="client-info-card">
            <Phone />
            <span>Phone</span>
            <strong>{client.phone}</strong>
          </div>

          <div className="client-info-card">
            <AlertCircle />
            <span>Status</span>
            <strong>{client.status}</strong>
          </div>

          <div className="client-info-card">
            <Gift />
            <span>Birthday</span>
            <strong>{client.birthday}</strong>
          </div>
        </div>

        <div className="client-profile-sections">
          <section className="client-section-card">
            <div className="client-section-title">
              <NotebookText />
              <h3>Client Notes</h3>
            </div>

            <textarea
              value={noteText}
              onChange={(event) => setNoteText(event.target.value)}
              placeholder="Add a note about this client..."
              className="client-workflow-textarea"
            />

            <button
              className="primary-button full"
              onClick={handleAddNote}
              disabled={isSavingNote}
            >
              <Plus size={16} />
              {isSavingNote ? 'Saving...' : 'Add Note'}
            </button>

            <div className="mini-file-list workflow-list">
              {isLoading && <p>Loading notes...</p>}

              {!isLoading && notes.length === 0 && (
                <p>No notes yet. Add the first note for this client.</p>
              )}

              {notes.map((note) => (
                <div className="workflow-item" key={note.id}>
                  <strong>{note.createdByName}</strong>
                  <p>{note.note}</p>
                  <small>{note.createdAt}</small>
                </div>
              ))}
            </div>
          </section>

          <section className="client-section-card">
            <div className="client-section-title">
              <CalendarDays />
              <h3>Follow-Up Tasks</h3>
            </div>

            <input
              value={taskTitle}
              onChange={(event) => setTaskTitle(event.target.value)}
              placeholder="Task title, ex: Call client tomorrow"
              className="client-workflow-input"
            />

            <textarea
              value={taskDescription}
              onChange={(event) => setTaskDescription(event.target.value)}
              placeholder="Optional task details..."
              className="client-workflow-textarea"
            />

            <div className="workflow-form-row">
              <input
                type="date"
                value={taskDueDate}
                onChange={(event) => setTaskDueDate(event.target.value)}
                className="client-workflow-input"
              />

              <select
                value={taskPriority}
                onChange={(event) =>
                  setTaskPriority(event.target.value as FollowUpTask['priority'])
                }
                className="client-workflow-input"
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
              </select>
            </div>

            <button
              className="primary-button full"
              onClick={handleAddTask}
              disabled={isSavingTask}
            >
              <Plus size={16} />
              {isSavingTask ? 'Creating...' : 'Create Follow-Up'}
            </button>

            <div className="mini-file-list workflow-list">
              {isLoading && <p>Loading tasks...</p>}

              {!isLoading && tasks.length === 0 && (
                <p>No follow-up tasks yet. Create one to keep the client moving.</p>
              )}

              {tasks.map((task) => (
                <div
                  className={task.status === 'completed' ? 'workflow-item completed' : 'workflow-item'}
                  key={task.id}
                >
                  <div className="workflow-item-head">
                    <strong>{task.title}</strong>
                    <span className={task.priority === 'high' ? 'status-pill lost' : 'status-pill pending'}>
                      {task.priority}
                    </span>
                  </div>

                  {task.description && <p>{task.description}</p>}

                  <small>
                    Assigned to {task.assignedToName} • Due {formatDueDate(task.dueDate)}
                  </small>

                  {task.status === 'completed' ? (
                    <button className="small-action-button secondary-small" disabled>
                      <CheckCircle2 size={15} />
                      Completed
                    </button>
                  ) : (
                    <button
                      className="small-action-button"
                      onClick={() => handleCompleteTask(task.id)}
                    >
                      <CheckCircle2 size={15} />
                      Mark Done
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="client-section-card">
            <div className="client-section-title">
              <DollarSign />
              <h3>Payment Plan</h3>
            </div>

            <div className="payment-preview">
              <div>
                <span>Total Balance</span>
                <strong>{isPetra ? '$1,200' : '$350'}</strong>
              </div>

              <div>
                <span>Down Payment</span>
                <strong>{isPetra ? '$200' : '$100'}</strong>
              </div>

              <div>
                <span>Monthly</span>
                <strong>{isPetra ? '$250/mo' : '$125/mo'}</strong>
              </div>

              <div>
                <span>Next Due</span>
                <strong>Coming Next</strong>
              </div>
            </div>
          </section>

          <section className="client-section-card">
            <div className="client-section-title">
              <FileText />
              <h3>{isPetra ? 'Policies / Files' : 'Customer Files'}</h3>
            </div>

            <div className="mini-file-list">
              <p>File/document tracking is coming next.</p>
              <p>This section will show uploaded IDs, applications, tax documents, policies, and receipts.</p>
            </div>
          </section>
        </div>

        <div className="client-profile-actions">
          <button className="primary-button" onClick={() => onBirthdayText(client.name)}>
            <Gift size={17} />
            Birthday Text
          </button>

          <button className="teal-button" onClick={onPromoText}>
            <MessageSquareText size={17} />
            Promo Text
          </button>

          <button className="secondary-button" onClick={loadWorkflow}>
            <RefreshCw size={17} />
            Refresh Notes/Tasks
          </button>
        </div>
      </div>
    </div>
  )
}