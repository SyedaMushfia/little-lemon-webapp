import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import BookingsPage from './components/pages/bookingPage/BookingsPage';
import BookingForm from './components/pages/bookingPage/BookingForm';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { initializeTimes, updateTimes } from './components/Main';
import { fetchAPI } from './utils';
import userEvent from '@testing-library/user-event';

const mockProps = {
  availableTimes: ['18:00', '19:00'],
  formData: {
    selectedDate: dayjs(),
    time: '',
    people: '',
    occasion: '',
    seatingArea: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  },
  errors: {},
  onInputBlur: jest.fn(),
  onTimeFocus: jest.fn(),
  onDateChange: jest.fn(),
  onInputChange: jest.fn(),
  onClearForm: jest.fn(),
};

test('renders the BookingsPage heading', () => {
  render(<BookingsPage {...mockProps}/>);
  const heading = screen.getByText("Book Your Table Online Now!");
  expect(heading).toBeInTheDocument();
});

jest.mock('./utils');

describe('initializeTimes', () => {
  test('should return time slots from fetchAPI', () => {
    const expectedTimes = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
    fetchAPI.mockReturnValue(expectedTimes);

    const result = initializeTimes();
    
    expect(fetchAPI).toHaveBeenCalled();
    expect(result).toEqual(expectedTimes);
  })
});

describe('updateTimes', () => {
  test('should return updated times from fetchAPI when action type is UPDATE_TIMES', () => {
    const expectedUpdatedTimes = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
    const date = '2025-04-12';
    fetchAPI.mockReturnValue(expectedUpdatedTimes);

    const action = { type: 'UPDATE_TIMES', payload: date };
    const result = updateTimes([], action);

    expect(fetchAPI).toHaveBeenCalledWith(new Date(date));
    expect(result).toEqual(expectedUpdatedTimes);
  })
})

describe('booking form input attributes', () => {
  test('DateCalendar renders with correct aria-label', () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={dayjs()}
          onChange={() => {}}
          aria-label="Select reservation date"
        />
      </LocalizationProvider>
    );
  
    const calendar = screen.getByLabelText(/select reservation date/i);
    expect(calendar).toHaveAttribute('aria-label', 'Select reservation date');
  });
  

  test('Time input has correct attributes', () => {
    render(
      <BookingForm {...mockProps}/>
    )

    const timeSelect = screen.getByLabelText(/time/i);
    expect(timeSelect).toHaveAttribute('id', 'time');
    expect(timeSelect).toHaveAttribute('name', 'time');
    expect(timeSelect).toHaveAttribute('required');
  })

  test('People input has correct attributes', () => {
    render(
      <BookingForm {...mockProps}/>
    )

    const peopleSelect = screen.getByLabelText(/people/i);
    expect(peopleSelect).toHaveAttribute('id', 'people');
    expect(peopleSelect).toHaveAttribute('name', 'people');
    expect(peopleSelect).toHaveAttribute('required');
  })

  test('Occasion input has correct attributes', () => {
    render(
      <BookingForm {...mockProps}/>
    )

    const occasionSelect = screen.getByLabelText(/occasion/i);
    expect(occasionSelect).toHaveAttribute('id', 'occasion');
    expect(occasionSelect).toHaveAttribute('name', 'occasion');
    expect(occasionSelect).toHaveAttribute('required');
  })

  test('Seating area input has correct attributes', () => {
    render(
      <BookingForm {...mockProps}/>
    )

    const seatingAreaSelect = screen.getByLabelText(/seating area/i);
    expect(seatingAreaSelect).toHaveAttribute('id', 'seatingArea');
    expect(seatingAreaSelect).toHaveAttribute('name', 'seatingArea');
    expect(seatingAreaSelect).toHaveAttribute('required');
  })

  test('First name input has correct attributes', async () => {
    render(<BookingForm {...mockProps} />);
  
    const nextButton = screen.getByLabelText(/step 2: contact/i);
    await userEvent.click(nextButton);
  
    const firstNameInput = screen.getByLabelText(/first name/i);
    expect(firstNameInput).toHaveAttribute('id', 'firstName');
    expect(firstNameInput).toHaveAttribute('name', 'firstName');
    expect(firstNameInput).toHaveAttribute('type', 'text');
    expect(firstNameInput).toHaveAttribute('minLength', '2');
    expect(firstNameInput).toHaveAttribute('required');
  });
  
  test('Last name input has correct attributes', async () => {
    render(<BookingForm {...mockProps} />);
    const nextButton = screen.getByLabelText(/step 2: contact/i);
    await userEvent.click(nextButton);
  
    const lastNameInput = screen.getByLabelText(/last name/i);
    expect(lastNameInput).toHaveAttribute('id', 'lastName');
    expect(lastNameInput).toHaveAttribute('name', 'lastName');
    expect(lastNameInput).toHaveAttribute('type', 'text');
    expect(lastNameInput).toHaveAttribute('minLength', '2');
    expect(lastNameInput).toHaveAttribute('required');
  });

  test('Email input has correct attributes', async () => {
    render(<BookingForm {...mockProps} />);
    const nextButton = screen.getByLabelText(/step 2: contact/i);
    await userEvent.click(nextButton);
  
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toHaveAttribute('id', 'email');
    expect(emailInput).toHaveAttribute('name', 'email');
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveAttribute('required');
  });

  test('Phone input has correct attributes', async () => {
    render(<BookingForm {...mockProps} />);
    const nextButton = screen.getByLabelText(/step 2: contact/i);
    await userEvent.click(nextButton);
  
    const phoneInput = screen.getByLabelText(/phone/i);
    expect(phoneInput).toHaveAttribute('id', 'phone');
    expect(phoneInput).toHaveAttribute('name', 'phone');
    expect(phoneInput).toHaveAttribute('type', 'tel');
    expect(phoneInput).toHaveAttribute('required');
  });
})

const mockAvailableTimes = ['17:00', '18:00'];
const mockOnSubmitForm = jest.fn();
const defaultFormData = {
  selectedDate: null,
  time: '',
  people: '',
  occasion: '',
  seatingArea: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
};
const defaultErrors = {};

describe('BookingForm', () => {
  test('shows validation errors on empty submit of Step 1', () => {
    render(
      <BookingForm
        availableTimes={mockAvailableTimes}
        formData={defaultFormData}
        errors={defaultErrors}
        onInputBlur={() => {}}
        onInputChange={() => {}}
        onDateChange={() => {}}
        onSubmitForm={mockOnSubmitForm}
        onTimeFocus={() => {}}
      />
    );

    const nextButton = screen.getByRole('button', { name: /proceed to contact information/i });
    expect(nextButton).toBeDisabled();
  });

  test('shows validation errors on blur if inputs are empty', () => {
    const errors = {
      time: 'Please select a reservation time',
      people: 'Please select the no. of people',
      occasion: 'Please select an occasion',
      seatingArea: 'Please select a seating area',
    };

    const handleBlurMock = jest.fn();

    render(
      <BookingForm
        availableTimes={mockAvailableTimes}
        formData={defaultFormData}
        errors={errors}
        onInputBlur={handleBlurMock}
        onInputChange={() => {}}
        onDateChange={() => {}}
        onSubmitForm={mockOnSubmitForm}
        onTimeFocus={() => {}}
      />
    );

    const timeSelect = screen.getByLabelText(/time/i);
    const peopleSelect = screen.getByLabelText(/people/i);
    const occasionSelect = screen.getByLabelText(/occasion/i);
    const seatingSelect = screen.getByLabelText(/seating area/i);

    fireEvent.blur(timeSelect);
    fireEvent.blur(peopleSelect);
    fireEvent.blur(occasionSelect);
    fireEvent.blur(seatingSelect);

    expect(screen.getByText(/please select a reservation time/i)).toBeInTheDocument();
    expect(screen.getByText(/please select the no. of people/i)).toBeInTheDocument();
    expect(screen.getByText(/please select an occasion/i)).toBeInTheDocument();
    expect(screen.getByText(/please select a seating area/i)).toBeInTheDocument();

    const nextButton = screen.getByRole('button', { name: /proceed to contact information/i });
    expect(nextButton).toBeDisabled();
  });

  test('proceeds to step 2 with valid step 1 data', () => {
    const updatedFormData = {
      ...defaultFormData,
      selectedDate: dayjs(),
      time: '17:00',
      people: '2 people',
      occasion: 'Birthday',
      seatingArea: 'Indoor',
    };

    render(
      <BookingForm
        availableTimes={mockAvailableTimes}
        formData={updatedFormData}
        errors={defaultErrors}
        onInputBlur={() => {}}
        onInputChange={() => {}}
        onDateChange={() => {}}
        onSubmitForm={mockOnSubmitForm}
        onTimeFocus={() => {}}
      />
    );

    const nextButton = screen.getByRole('button', { name: /proceed to contact information/i });
    expect(nextButton).toBeEnabled();
    fireEvent.click(nextButton);

    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
  });

  test('shows error on invalid email and phone in step 2', () => {
    const step2FormData = {
      ...defaultFormData,
      selectedDate: dayjs(),
      time: '17:00',
      people: '2 people',
      occasion: 'Birthday',
      seatingArea: 'Indoor',
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'invalid-email',
      phone: '123',
    };

    const step2Errors = {
      email: 'Please enter a valid email.',
      phone: 'Please enter a valid phone number.',
    };

    render(
      <BookingForm
        availableTimes={mockAvailableTimes}
        formData={step2FormData}
        errors={step2Errors}
        onInputBlur={() => {}}
        onInputChange={() => {}}
        onDateChange={() => {}}
        onSubmitForm={mockOnSubmitForm}
        onTimeFocus={() => {}}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /step 2: contact/i }));

    expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter a valid phone number/i)).toBeInTheDocument();

    const nextButton = screen.getByRole('button', { name: /proceed to confirm and reserve/i });
    expect(nextButton).toBeDisabled();
    fireEvent.click(nextButton);
  });

  test('enables next button when Step 2 form data is valid', () => {
    const step2FormData = {
      ...defaultFormData,
      selectedDate: dayjs(),
      time: '17:00',
      people: '2 people',
      occasion: 'Birthday',
      seatingArea: 'Indoor',
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@gmail.com',
      phone: '1234567890',
    };

    const step2Errors = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    };

    render(
      <BookingForm
        availableTimes={mockAvailableTimes}
        formData={step2FormData}
        errors={step2Errors}
        onInputBlur={() => {}}
        onInputChange={() => {}}
        onDateChange={() => {}}
        onSubmitForm={mockOnSubmitForm}
        onTimeFocus={() => {}}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /step 2: contact/i }));

    const nextButton = screen.getByRole('button', { name: /proceed to confirm and reserve/i });
    expect(nextButton).toBeEnabled();
    fireEvent.click(nextButton);
  });

  test('calls onSubmitForm with valid data in step 3', () => {
    const validFormData = {
      selectedDate: dayjs(),
      time: '18:00',
      people: '2 people',
      occasion: 'Anniversary',
      seatingArea: 'Outdoor',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '9876543210',
    };

    render(
      <BookingForm
        availableTimes={mockAvailableTimes}
        formData={validFormData}
        errors={{}}
        onInputBlur={() => {}}
        onInputChange={() => {}}
        onDateChange={() => {}}
        onSubmitForm={mockOnSubmitForm}
        onTimeFocus={() => {}}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /step 3: confirm/i }));

    const submitBtn = screen.getByRole('button', { name: /Submit reservation/i });
    fireEvent.click(submitBtn);

    expect(mockOnSubmitForm).toHaveBeenCalledWith(validFormData);
  });
});