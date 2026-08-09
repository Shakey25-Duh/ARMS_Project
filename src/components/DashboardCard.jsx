function DashboardCard({ title, value, color }) {
  return (
    <div className="col-md-6 mb-4">
      <div className={`card shadow text-white bg-${color}`}>
        <div className="card-body text-center">
          <h5>{title}</h5>

          <h1>{value}</h1>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;
