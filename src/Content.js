export default function Content() {
    return (
        <div className="row">
            <div className="col-3 bg-secondary border border-dark">
                <h1>sidebar</h1>
                <div>
                    <form class="d-flex">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button class="btn bt text-dark bg-light" type="submit">Hae</button>
                    </form>
                </div>
                <div>
                    <select class="form-select" aria-label="Default select example">
                        <option selected>Lajittele</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>

            </div>
            <div className="col-9 bg-secondary border border-dark">
                <h1>content</h1>
            </div>



        </div>
    )
}