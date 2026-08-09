import { Link } from "react-router-dom";

function DashboardCard({
    title,
    value,
    color,
    link
}) {

    const cardContent = (

        <div
            className={card shadow text-white bg-${color} dashboard-card}
        >

            <div className="card-body text-center">

                <h5 className="mb-2">
                    {title}
                </h5>

                <h1 className="mb-1">
                    {value}
                </h1>

                {link && (

                    <small className="card-action">

                        Click to view →

                    </small>

                )}

            </div>

        </div>

    );


    return (

        <div className="col-md-6 mb-4">

            {link ? (

                <Link
                    to={link}
                    className="dashboard-card-link"
                    aria-label={View ${title}}
                >

                    {cardContent}

                </Link>

            ) : (

                cardContent

            )}

        </div>

    );

}

export default DashboardCard;