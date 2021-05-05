package com.thsgroup.Clinic.Appointment;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppointmentService {
    
	private final AppointmentRepository appointmentRepository;

	@Autowired
	public AppointmentService(AppointmentRepository appointmentRepository) {
		this.appointmentRepository = appointmentRepository;
	}
	
    public List<Appointment> getAppointments() {
		return appointmentRepository.findAll();
}

    public void addNewAppointment(Appointment appointment) {
		appointmentRepository.save(appointment);
    }



}
