function StatusMessage({ children, tone = 'default' }) {
  const className =
    tone === 'error' ? 'status-message status-message--error' : 'status-message'

  return <p className={className}>{children}</p>
}

export default StatusMessage
