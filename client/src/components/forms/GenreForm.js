export default function GenreForm({ value, setValue, handleSubmit }) {
  return (
    <div className="p-3">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control p-3"
          placeholder="write genre name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="btn btn-primary mt-3">Submit</button>
      </form>
    </div>
  );
}
