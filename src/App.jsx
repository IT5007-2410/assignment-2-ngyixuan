/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const initialTravellers = [
  {
    id: 1,
    name: "Jack",
    phone: 88885555,
    bookingTime: new Date(),
  },
  {
    id: 2,
    name: "Rose",
    phone: 88884444,
    bookingTime: new Date(),
  },
];
const totalSeat = 10;

function TravellerRow(props) {
  {
    /*Q3. Placeholder to initialize local variable based on traveller prop.*/
  }

  const { id, name, phone, bookingTime } = props.traveller;
  return (
    <tr>
      {/*Q3. Placeholder for rendering one row of a table with required traveller attribute values.*/}
      <td>{id}</td>
      <td>{name}</td>
      <td>{phone}</td>
      <td>{bookingTime.toLocaleString()}</td>
    </tr>
  );
}

function Display(props) {
  /*Q3. Write code to render rows of table, reach corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/

  return (
    <table
      className="bordered-table"
      style={{ width: "100%", fontSize: "16px" }}
    >
      <thead>
        <tr>
          {/*Q3. Below table is just an example. Add more columns based on the traveller attributes you choose.*/}
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Booking Time</th>
        </tr>
      </thead>
      <tbody>
        {/*Q3. write code to call the JS variable defined at the top of this function to render table rows.*/}
        {props.travellers.map((traveller) => (
          <TravellerRow key={traveller.id} traveller={traveller} />
        ))}
      </tbody>
    </table>
  );
}

class Add extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    /*Q4. Fetch the passenger details from the add form and call bookTraveller()*/
    const name = e.target.name.value;
    const phone = e.target.phone.value;
    const passenger = { name, phone };
    if (name == "" || phone == "") {
      alert("Invalid input");
      return;
    }
    let res = this.props.bookTraveller(passenger);
    if (res) alert("Passenger added");
  }

  render() {
    return (
      <form
        style={{
          fontSize: "16px",
          display: "flex",
          gap: 10,
          flexDirection: "column",
        }}
        name="addTraveller"
        onSubmit={this.handleSubmit}
      >
        {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
        <div>
          <label htmlFor="name">Name: </label>
          <input type="text" name="name" placeholder="Name" />
        </div>
        <div>
          <label htmlFor="phone">Phone: </label>
          <input type="number" name="phone" placeholder="Phone" />
        </div>

        <button style={{ width: "100px", padding: "10px 4px" }}>Add</button>
      </form>
    );
  }
}


class Delete extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    /*Q5. Fetch the passenger details from the deletion form and call deleteTraveller()*/
  }

  render() {
    return (
      <form name="deleteTraveller" onSubmit={this.handleSubmit}>
        {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
        <input type="text" name="travellername" placeholder="Name" />
        <button>Delete</button>
      </form>
    );
  }
}

class Homepage extends React.Component {
  constructor() {
    super();
  }
  render() {
    const seats = Array(totalSeat).fill(false);
    for (let i = 0; i < this.props.travellers.length && i < totalSeat; i++) {
      seats[i] = true;
    }
    const seatsLeft = seats.filter((isFilled) => !isFilled).length;
    return (
      /*Q2. Placeholder for Homepage code that shows free seats visually.*/
      <div>
        <h2>Seat remaining : {seatsLeft} seats</h2>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {seats.map((isFilled, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                width: "50px",
                height: "50px",
                backgroundColor: isFilled ? "grey" : "green",
                border: "1px solid black",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
              }}
            >
              {isFilled ? "Filled" : `Empty`}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = { travellers: [], selector: 1, nextId: 3 };
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
  }

  setSelector(value)
  {
    /*Q2. Function to set the value of component selector variable based on user's button click.*/
    this.setState({
      selector: value,
    });
  }
  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: initialTravellers });
    }, 500);
  }

  bookTraveller(passenger) {
    /*Q4. Write code to add a passenger to the traveller state variable.*/
    const newTraveller = {
      id: this.state.nextId,
      name: passenger.name,
      phone: passenger.phone,
      bookingTime: new Date(),
    };
    if (this.state.travellers.length >= totalSeat) {
      alert("All seat has been occupied");
      return false;
    }
    this.setState((prevState) => ({
      travellers: [...prevState.travellers, newTraveller],
      nextId: prevState.nextId + 1,
    }));
    return true;
  }

  deleteTraveller(passenger) {
    /*Q5. Write code to delete a passenger from the traveller state variable.*/
  }
  render() {
    return (
      <div>
        <h1>Ticket To Ride</h1>
        <div>
          {/*Q2. Code for Navigation bar. Use basic buttons to create a nav bar. Use states to manage selection.*/}
          <nav
            style={{
              display: "flex",
              flexDirection: "row",
              fontSize: "16px",
              gap: 3,
              marginBottom: "20px",
            }}
          >
            <button
              style={{ background: "white", padding: "10px" }}
              onClick={() => this.setSelector(1)}
            >
              Homepage
            </button>
            <button
              style={{ background: "white", padding: "10px" }}
              onClick={() => this.setSelector(2)}
            >
              Display traveller
            </button>
            <button
              style={{ background: "white", padding: "10px" }}
              onClick={() => this.setSelector(3)}
            >
              Add traveller
            </button>
            <button
              style={{ background: "white", padding: "10px" }}
              onClick={() => this.setSelector(4)}
            >
              Delete traveller
            </button>
          </nav>
        </div>
        <div>
          {/*Only one of the below four divisions is rendered based on the button clicked by the user.*/}
          {/*Q2 and Q6. Code to call Instance that draws Homepage. Homepage shows Visual Representation of free seats.*/}
          {this.state.selector == 1 && (
            <Homepage travellers={this.state.travellers} />
          )}
          {/*Q3. Code to call component that Displays Travellers.*/}
          {this.state.selector == 2 && (
            <Display travellers={this.state.travellers} />
          )}

          {/*Q4. Code to call the component that adds a traveller.*/}
          {this.state.selector == 3 && (
            <Add bookTraveller={this.bookTraveller} />
          )}
          {/*Q5. Code to call the component that deletes a traveller based on a given attribute.*/}
          {this.state.selector == 4 && (
            <Delete deleteTraveller={this.deleteTraveller} />
          )}
        </div>
      </div>
    );
  }
}

const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));
