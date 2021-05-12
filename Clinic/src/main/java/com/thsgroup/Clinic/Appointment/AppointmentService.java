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

	public Appointment getAppointmentById(Long id) {
		return appointmentRepository.findById(id).orElse(null);
	}

	public List<Appointment> getAppointmentByPatientId(Long patientId) {
		return appointmentRepository.findByPatientId(patientId);
	}

	public List<Appointment> getAppointmentByDoctorId(Long doctorId) {
		return appointmentRepository.findByDoctorId(doctorId);
	}

	public List<Long> getAppointmentIdByPatientId(Long patientId) {
		return appointmentRepository.findAppointmentIdByPatientId(patientId);
	}

	public List<Long> getAppointmentIdByDoctorId(Long doctorId) {
		return appointmentRepository.findAppointmentIdByDoctorId(doctorId);
	}

    public void addNewAppointment(Appointment appointment) {
		appointmentRepository.save(appointment);
    }

	public void addNewAppointments(List<Appointment> appointments) {
		appointmentRepository.saveAll(appointments);
	}

	public void deleteAppointment(Long id) {
		appointmentRepository.deleteById(id);
	}

	public void updateAppointment(Appointment appointment) {
		Appointment existingAppointment = appointmentRepository.findById(appointment.getId()).orElse(null);
		existingAppointment.setId(appointment.getId());
		existingAppointment.setPatientId(appointment.getPatientId());
		existingAppointment.setDoctorId(appointment.getDoctorId());
		existingAppointment.setDate(appointment.getDate());

		appointmentRepository.save(existingAppointment);
	}
}
