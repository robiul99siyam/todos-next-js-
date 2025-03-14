export default function CloseForm({ setShow }) {
  return (
    <div className="flex justify-between items-start gap-10">
      <h2 className="text-xl font-bold mb-4">Create New Entry</h2>
      <span
        onClick={() => setShow(false)}
        className="text-3xl font-semibold text-gray-50 cursor-pointer"
      >
        X
      </span>
    </div>
  );
}
