import Button from "../../ui/Button.jsx";
import Modal from "../../ui/Modal.jsx";
import CreateCabinForm from "./CreateCabinForm.jsx";

// Component for adding a new cabin through a modal form
function AddCabin() {
  return (
    <div>
      {/* Modal wrapper for cabin creation form */}
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>

        {/* Modal window containing the cabin creation form */}
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCabin;
