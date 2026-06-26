import { X } from 'lucide-react'

type Props = {
  title: string
  description: string
  onClose: () => void
}

export function DemoFeatureModal({ title, description, onClose }: Props) {
  return (
    <div className="modal-backdrop">
      <div className="demo-modal">
        <div className="demo-modal-head">
          <div>
            <span className="demo-badge light">Demo Workflow</span>
            <h2>{title}</h2>
          </div>

          <button onClick={onClose} aria-label="Close demo feature">
            <X size={20} />
          </button>
        </div>

        <div className="message-preview-box">
          {description}
        </div>

        <div className="modal-actions">
          <button className="primary-button" onClick={onClose}>
            Got it
          </button>
        </div>
      </div>
    </div>
  )
}
