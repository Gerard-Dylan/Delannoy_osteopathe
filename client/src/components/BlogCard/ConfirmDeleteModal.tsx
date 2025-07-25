import "./ConfirmDeleteModal.css";

interface ConfirmDeleteModalProps {
	onConfirm: () => void;
	onCancel: () => void;
	title?: string;
}

function ConfirmDeleteModal({
	onConfirm,
	onCancel,
	title,
}: ConfirmDeleteModalProps) {
	return (
		<div
			className="modal-overlay"
			onClick={(e) => e.target === e.currentTarget && onCancel()}
		>
			<div
				className="modal-content"
				role="dialog"
				aria-modal="true"
				aria-labelledby="confirm-title"
			>
				<h2 id="confirm-title" className="confirm-title">
					{title || "Confirmer la suppression de l'article ?"}
				</h2>
				<div className="confirm-buttons">
					<button className="confirm-btn delete" onClick={onConfirm}>
						Supprimer
					</button>
					<button className="confirm-btn cancel" onClick={onCancel}>
						Annuler
					</button>
				</div>
			</div>
		</div>
	);
}

export default ConfirmDeleteModal;
