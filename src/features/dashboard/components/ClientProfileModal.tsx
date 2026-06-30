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
import type { PaymentPlan } from '../../../types/payment'
import {
  completeTask,
  createClientNote,
  createFollowUpTask,
  listClientNotes,
  listClientTasks
} from '../../../services/workflowService'
import {
  createPaymentPlan,
  listClientPaymentPlans
} from '../../../services/paymentPlanService'

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

function formatMoney(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value || 0)
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
  const [paymentPlans, setPaymentPlans] = useState<PaymentPlan[]>([])

  const [noteText, setNoteText] = useState('')
  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [taskDueDate, setTaskDueDate] = useState('')
  const [taskPriority, setTaskPriority] = useState<FollowUpTask['priority']>('normal')

  const [paymentTotal, setPaymentTotal] = useState(isPetra ? '1200' : '350')
  const [paymentDown, setPaymentDown] = useState(isPetra ? '200' : '100')
  const [paymentMonths, setPaymentMonths] = useState('4')
  const [paymentNextDueDate, setPaymentNextDueDate] = useState('')
  const [paymentNotes, setPaymentNotes] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const [isSavingNote, setIsSavingNote] = useState(false)
  const [isSavingTask, setIsSavingTask] = useState(false)
  const [isSavingPayment, setIsSavingPayment] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const businessId = getBusinessId(activeBusiness)
  const currentPaymentPlan = paymentPlans[0]

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

      setPaymentPlans([
        {
          id: 'demo-payment-1',
          businessId,
          clientId: client.id,
          clientName: client.name,
          assignedToName: activeEmployeeName,
          serviceName: client.service,
          totalAmount: isPetra ? 1200 : 350,
          downPayment: isPetra ? 200 : 100,
          balance: isPetra ? 1000 : 250,
          monthlyPayment: isPetra ? 250 : 125,
          months: isPetra ? 4 : 2,
          nextDueDate: '',
          status: 'active',
          notes: 'Demo payment plan.',
          createdByName: activeEmployeeName,
          createdAt: 'Demo'
        }
      ])

      return
    }

    setIsLoading(true)
    setErrorMessage('')

    try {
      const [clientNotes, clientTasks, clientPaymentPlans] = await Promise.all([
        listClientNotes(client.id),
        listClientTasks(client.id),
        listClientPaymentPlans(client.id)
      ])

      setNotes(clientNotes)
      setTasks(clientTasks)
      setPaymentPlans(clientPaymentPlans)
    } catch (error) {
      console.error('Could not load client workflow:', error)
      setErrorMessage('Could not load notes, tasks, or payment plans. Check Appwrite permissions.')
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

  const handleCreatePaymentPlan = async () => {
    const totalAmount = Number(paymentTotal) || 0
    const downPayment = Number(paymentDown) || 0
    const months = Math.max(Number(paymentMonths) || 1, 1)

    if (totalAmount <= 0) {
      setErrorMessage('Total amount must be greater than 0.')
      return
    }

    setIsSavingPayment(true)
    setErrorMessage('')

    const dueDateIso = paymentNextDueDate
      ? new Date(`${paymentNextDueDate}T09:00:00`).toISOString()
      : ''

    try {
      if (isDemoMode) {
        const balance = Math.max(totalAmount - downPayment, 0)
        const monthlyPayment = Number((balance / months).toFixed(2))

        const demoPlan: PaymentPlan = {
          id: `demo-payment-${Date.now()}`,
          businessId,
          clientId: client.id,
          clientName: client.name,
          assignedToName: activeEmployeeName,
          serviceName: client.service,
          totalAmount,
          downPayment,
          balance,
          monthlyPayment,
          months,
          nextDueDate: dueDateIso,
          status: 'active',
          notes: paymentNotes.trim(),
          createdByName: activeEmployeeName,
          createdAt: 'Just now'
        }

        setPaymentPlans((current) => [demoPlan, ...current])

        if (dueDateIso) {
          const demoTask: FollowUpTask = {
            id: `demo-payment-task-${Date.now()}`,
            businessId,
            clientId: client.id,
            leadId: '',
            assignedTo: '',
            assignedToName: activeEmployeeName,
            title: `Payment due for ${client.name}`,
            description: `Payment plan reminder. Monthly payment: ${formatMoney(monthlyPayment)}.`,
            dueDate: dueDateIso,
            status: 'open',
            priority: 'high',
            createdBy: '',
            createdByName: activeEmployeeName,
            completedAt: '',
            createdAt: 'Just now'
          }

          setTasks((current) => [demoTask, ...current])
        }

        setPaymentNotes('')
        return
      }

      const newPaymentPlan = await createPaymentPlan({
        businessId,
        clientId: client.id,
        clientName: client.name,
        assignedToName: activeEmployeeName,
        serviceName: client.service,
        totalAmount,
        downPayment,
        months,
        nextDueDate: dueDateIso,
        notes: paymentNotes,
        createdByName: activeEmployeeName
      })

      setPaymentPlans((current) => [newPaymentPlan, ...current])

      if (dueDateIso) {
        const reminderTask = await createFollowUpTask({
          businessId,
          clientId: client.id,
          assignedToName: activeEmployeeName,
          title: `Payment due for ${client.name}`,
          description: `Payment plan reminder. Monthly payment: ${formatMoney(newPaymentPlan.monthlyPayment)}.`,
          dueDate: dueDateIso,
          priority: 'high',
          createdByName: activeEmployeeName
        })

        setTasks((current) => [reminderTask, ...current])
      }

      setPaymentNotes('')
    } catch (error) {
      console.error('Could not create payment plan:', error)
      setErrorMessage('Could not create payment plan. Check Appwrite permissions.')
    } finally {
      setIsSavingPayment(false)
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
              <DollarSign />
              <h3>Payment Plan</h3>
            </div>

            <div className="payment-preview">
              <div>
                <span>Total Balance</span>
                <strong>
                  {currentPaymentPlan ? formatMoney(currentPaymentPlan.totalAmount) : 'None'}
                </strong>
              </div>

              <div>
                <span>Down Payment</span>
                <strong>
                  {currentPaymentPlan ? formatMoney(currentPaymentPlan.downPayment) : 'None'}
                </strong>
              </div>

              <div>
                <span>Monthly</span>
                <strong>
                  {currentPaymentPlan ? `${formatMoney(currentPaymentPlan.monthlyPayment)}/mo` : 'None'}
                </strong>
              </div>

              <div>
                <span>Next Due</span>
                <strong>
                  {currentPaymentPlan ? formatDueDate(currentPaymentPlan.nextDueDate) : 'None'}
                </strong>
              </div>
            </div>

            <div className="add-client-form" style={{ marginTop: 16 }}>
              <div className="workflow-form-row">
                <div>
                  <label>Total Amount</label>
                  <input
                    value={paymentTotal}
                    onChange={(event) => setPaymentTotal(event.target.value)}
                    placeholder="1200"
                  />
                </div>

                <div>
                  <label>Down Payment</label>
                  <input
                    value={paymentDown}
                    onChange={(event) => setPaymentDown(event.target.value)}
                    placeholder="200"
                  />
                </div>
              </div>

              <div className="workflow-form-row">
                <div>
                  <label>Months</label>
                  <input
                    value={paymentMonths}
                    onChange={(event) => setPaymentMonths(event.target.value)}
                    placeholder="4"
                  />
                </div>

                <div>
                  <label>Next Due Date</label>
                  <input
                    type="date"
                    value={paymentNextDueDate}
                    onChange={(event) => setPaymentNextDueDate(event.target.value)}
                  />
                </div>
              </div>

              <label>Payment Notes</label>
              <textarea
                value={paymentNotes}
                onChange={(event) => setPaymentNotes(event.target.value)}
                placeholder="Example: Client paid deposit today. First payment due next month."
              />
            </div>

            <button
              className="primary-button full"
              onClick={handleCreatePaymentPlan}
              disabled={isSavingPayment}
            >
              <Plus size={16} />
              {isSavingPayment ? 'Creating...' : 'Create Payment Plan'}
            </button>

            <div className="mini-file-list workflow-list">
              {isLoading && <p>Loading payment plans...</p>}

              {!isLoading && paymentPlans.length === 0 && (
                <p>No payment plans yet. Create one for this client.</p>
              )}

              {paymentPlans.map((plan) => (
                <div className="workflow-item" key={plan.id}>
                  <div className="workflow-item-head">
                    <strong>{formatMoney(plan.balance)} balance</strong>
                    <span className="status-pill active">{plan.status}</span>
                  </div>

                  <p>
                    {formatMoney(plan.monthlyPayment)}/mo for {plan.months} months.
                    Down payment: {formatMoney(plan.downPayment)}.
                  </p>

                  <small>
                    Next due: {formatDueDate(plan.nextDueDate)} • Created by {plan.createdByName}
                  </small>

                  {plan.notes && <p>{plan.notes}</p>}
                </div>
              ))}
            </div>
          </section>

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
            Refresh Client
          </button>
        </div>
      </div>
    </div>
  )
}