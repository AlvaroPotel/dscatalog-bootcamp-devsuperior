package com.devsuperior.dscatalog.resources.exceptions;

import java.io.Serializable;

public class FieldMessage implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private String fieldName;
	private String fieldmessage;
	
	public FieldMessage() {
	}

	public FieldMessage(String fieldName, String fieldmessage) {
		this.fieldName = fieldName;
		this.fieldmessage = fieldmessage;
	}

	public String getFieldName() {
		return fieldName;
	}

	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}

	public String getFieldmessage() {
		return fieldmessage;
	}

	public void setFieldmessage(String fieldmessage) {
		this.fieldmessage = fieldmessage;
	}

}
