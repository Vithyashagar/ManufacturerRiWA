package com;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class ManufacturerAPI
 */
@WebServlet("/ManufacturerAPI")
public class ManufacturerAPI extends HttpServlet {
	private static final long serialVersionUID = 1L;
    
	ManufacturerService ManuObj = new ManufacturerService();
	
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ManufacturerAPI() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String output = ManuObj.insertService(
				request.getParameter("serviceName"),
				request.getParameter("serviceSpecialty"),
				request.getParameter("serviceDesc"),
				request.getParameter("ManuID"));
				
		response.getWriter().write(output);
	}

	/**
	 * @see HttpServlet#doPut(HttpServletRequest, HttpServletResponse)
	 */
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Map paras = getParasMap(request);
		
		String output = ManuObj.updateService(
				paras.get("hidManuIDSave").toString(),
				paras.get("serviceName").toString(),
				paras.get("serviceSpecialty").toString(),
				paras.get("serviceDesc").toString());
		
		response.getWriter().write(output);
	}

	/**
	 * @see HttpServlet#doDelete(HttpServletRequest, HttpServletResponse)
	 */
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
Map paras = getParasMap(request);
		
		String output = ManuObj.deleteService(paras.get("SID").toString());
		
		response.getWriter().write(output);
		
	}
	
	private static Map getParasMap(HttpServletRequest request)
	{
		Map<String, String> map = new HashMap<String, String>();
		
		try{
			Scanner scanner = new Scanner(request.getInputStream(), "UTF-8");
			
			String queryString = scanner.hasNext() ?
			
			scanner.useDelimiter("\\A").next() : "";
			scanner.close();
			
			String[] params = queryString.split("&");
			
			for (String param : params){
				
				String[] p = param.split("=");
				map.put(p[0], p[1]);
			}
		}
		catch (Exception e){	
		}
		
		return map;
	
	}
	

}
